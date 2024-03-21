import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign, verify } from 'hono/jwt'



const app = new Hono < {
  Bindings: {                 // to specify the type of the DATABASE_URL
    DATABASE_URL: string,
    JWT_SECRET: string
  }
  Variables : {
		userId: string
	}
}>()


app.post('/api/v1/user/signup', async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate())

  const body = await c.req.json();
  const user = await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  });
  const token = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({jwt: token}); 
  
})



app.post('/api/v1/user/signin', async (c) => {        // email and pass validation remaining....
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const user = await prisma.user.findUnique({
    where: {email: body.email}
  })

  if (!user) {
    c.status(403)
    return c.json({error: "User not found"})
  }

  const token = await sign({ id: user.id }, c.env.JWT_SECRET)
  return c.json({token})

}) 

app.use('/api/v1/blog/*', async (c, next) => {      // Since this route should be accessible only after authentication so the jwt token must be passed as a header in this route
  const jwt = c.req.header('Authorization');

  if (!jwt) {
    c.status(401)
    return c.json({ error: "Unauthorized entity" })
  }
  const token = jwt.split(" ")[1];              //as the token is the 2nd 
  const payload = await verify(token, c.env.JWT_SECRET)
  if (!payload) {
    c.status(401)
    return c.json({error: "Unauthorized entity"})
  }
  c.set('userId', payload.id)
  await next();
})





app.post('api/v1/blog', (c) => {
  return c.text("blog")
})

app.get('/api/v1/blog/:id', (c) => {
  const id = c.req.param('id')
  console.log(id)
  return c.text(`blog id: ${id}`)
})

app.get('api/v1/blog/bulk')




export default app

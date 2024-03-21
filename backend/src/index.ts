import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { sign } from 'hono/jwt'



const app = new Hono < {
  Bindings: {                 // to specify the type of the DATABASE_URL
    DATABASE_URL: string,
    JWT_SECRET: string
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
    
  


  

  return c.text("signup")
})

app.post('/api/v1/user/signin', (c) => {
  return c.text("signin")
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
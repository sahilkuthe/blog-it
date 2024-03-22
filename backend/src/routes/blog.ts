import { Hono } from "hono";
import { verify } from "hono/jwt";
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'


export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string,
        JWT_SECRET: string
    }
    Variables : {
		userId: string
	}
}>();



blogRouter.use('/*', async (c, next) => {      // Since this route should be accessible only after authentication so the jwt token must be passed as a header in this route
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





blogRouter.post('/post', async (c) => {
    const userId = c.get('userId')

    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const post = await prisma.post.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: userId
        }
    })
    
    return c.json({
        id: post.id
    })
})

blogRouter.put('/', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    const post = await prisma.post.update({
        where: {
            id: body.id
        },
        data: {
            title: body.title,
            content: body.content,
            
        }
    })

    return c.json({
        id: post.id
    })
})

blogRouter.get('/', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const body = await c.req.json();
    try {
        const post = await prisma.post.findUnique({
        where: {id: body.id}
        })
        return c.json({ post })
    } catch (e) {
        c.status(404);
        return c.json({message: "Error while fetching request..."} )
    }
})

blogRouter.get('/bulk', async (c) => {
    const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate())

    const posts = await prisma.post.findMany();

    return c.json({ posts })
})




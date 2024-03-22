import { Hono } from "hono";
import app from "..";
import { PrismaClient } from "@prisma/client/extension";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";


export const userRouter = new Hono<{
    Bindings: {                 // to specify the type of the DATABASE_URL
        DATABASE_URL: string,
        JWT_SECRET: string
    } 
  
}>();


userRouter.post('/signup', async (c) => {
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



userRouter.post('/signin', async (c) => {        // email and pass validation remaining....
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
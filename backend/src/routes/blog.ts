import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { blogInput, blogUpdate } from "@zekrozo/blog-it-comm";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string;
    },
    Variables: {
        userId: string
    }
}>();

blogRouter.use(async (c, next) => {
    const jwt = c.req.header('Authorization');
	if (!jwt) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	const token = jwt.split(' ')[1];
	const payload = await verify(token, c.env.JWT_SECRET);
	if (!payload) {
		c.status(401);
		return c.json({ error: "unauthorized" });
	}
	c.set('userId', payload.id);
	await next()
});

blogRouter.post('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = blogInput.safeParse(body)
	if (!success) {
		c.status(411)
		return c.json({
			message: "Incorrect inputs!"
		})
	}

	try {
		const post = await prisma.post.create({
			data: {
				title: body.title,
				content: body.content,
				authorId: userId
			}
		});
		return c.json({
			id: post.id
		});
	} catch (error) {
		c.status(403)
		return c.json({
			message: "Error while posting the blog"
		})
	}
})

blogRouter.put('/', async (c) => {
	const userId = c.get('userId');
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());

	const body = await c.req.json();
	const { success } = blogUpdate.safeParse(body)
	if (!success) {
		c.status(411)
		return c.json({
			message: "incorrect inputs"
		})
	}
	

	try {
		prisma.post.update({
			where: {
				id: body.id,
				authorId: userId
			},
			data: {
				title: body.title,
				content: body.content
			}
		});

		return c.text('updated post');
	} catch (error) {
		c.status(403)
		return c.json({
			message: "Error while updating the blog"
		})
	}
	
});

blogRouter.get('/bulk', async (c) => {

	try {

		const prisma = new PrismaClient({
			datasourceUrl: c.env?.DATABASE_URL,
		}).$extends(withAccelerate());

		const blogs = await prisma.post.findMany({
			select: {
				title: true,
				content: true,
				id: true,
				author: {
					select: {
						name: true
					}
				}
			}

			
		});

		return c.json({
			blogs
		})
		
	} catch (error) {
		console.error("Error while fetching blogs.", error);
		return c.status(500)
		
	}
	
})

blogRouter.get('/:id', async (c) => {
	const id = c.req.param('id');
	// console.log(id)
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL	,
	}).$extends(withAccelerate());
	
	const post = await prisma.post.findUnique({
		where: {
			id
		},
		select: {
			id:true,
			title: true,
			content: true,
			author: {
				select: {
					name: true
				}
			}
		}
	});

	return c.json(post);
})
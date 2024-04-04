import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { userRouter } from './routes/user';
import { blogRouter } from './routes/blog';

export const app = new Hono<{
  Bindings: {
      DATABASE_URL: string;
      JWT_SECRET: string;
  }
}>();

app.use('/api/*', cors())
app.route('/api/v1/user', userRouter)
app.route('/api/v1/blogs', blogRouter)

export default app
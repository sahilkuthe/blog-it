import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.post('/api/v1/user/signup', (c) => {
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

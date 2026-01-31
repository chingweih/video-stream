import { Hono } from 'hono'
import { api } from './server/api'
import index from './public/index.html'
import { serve } from 'bun'

const app = new Hono()

app.route('/api/v1', api)

serve({
  routes: {
    '/api/*': app.fetch,
    '/*': index,
  },
  development: {
    hmr: true,
  },
})

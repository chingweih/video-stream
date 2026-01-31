import { Hono } from 'hono'
import { api } from './api'
import { client } from './client'

const app = new Hono()

app.route('/api/v1', api)
app.route('/', client)

export default app

import { hc } from 'hono/client'
import { APIClient } from '../../server/api'

export const api = hc<APIClient>('http://localhost:3000/api/v1')

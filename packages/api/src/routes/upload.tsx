import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'

export const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: () => {
    return <div>Upload</div>
  },
})

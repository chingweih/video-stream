import { RouterProvider, createRouter } from '@tanstack/react-router'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { indexRoute } from './routes'
import { rootRoute } from './layout'
import { uploadRoute } from './routes/upload'
import { videoRoute } from './routes/videos/[videoId]'

const routeTree = rootRoute.addChildren([indexRoute, uploadRoute, videoRoute])

const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

import '@fontsource-variable/jetbrains-mono'
import '@fontsource-variable/noto-sans-tc'
import '@fontsource-variable/roboto-slab'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

const queryClient = new QueryClient()

export const rootRoute = createRootRoute({
  component: () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className='font-sans bg-background min-w-full min-h-svh'>
          <div className='max-w-lg mx-auto w-full h-full'>
            <div className='*:hover:underline px-2 py-3 flex gap-5'>
              <Link to='/upload'>Upload</Link>
              <Link to='/upload'>Videos</Link>
            </div>
            <hr />
            <div className='p-5'>
              <Outlet />
            </div>
          </div>
          <TanStackRouterDevtools />
        </div>
      </QueryClientProvider>
    )
  },
})

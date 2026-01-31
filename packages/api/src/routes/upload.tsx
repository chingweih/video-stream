import { createRoute } from '@tanstack/react-router'
import { rootRoute } from '../layout'
import { useMutation } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { api } from '../fetchers/api'

export const uploadRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/upload',
  component: () => {
    const [file, setFile] = useState<File | null>()
    const fileInputRef = useRef<HTMLInputElement>(null)

    const mutation = useMutation({
      mutationKey: ['POST /videos', file],
      mutationFn: async () => {
        await api.videos.$post(
          {},
          {
            init: {
              body: file,
            },
          },
        )
      },
    })

    return (
      <form
        action={() => {
          mutation.mutate()
        }}
      >
        <input
          type='file'
          ref={fileInputRef}
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type='submit'>Submit</button>
      </form>
    )
  },
})

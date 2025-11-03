import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { keepPreviousData, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'

import type { ReactNode } from 'react'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      placeholderData: keepPreviousData,
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      gcTime: 1000 * 60 * 60 * 12, // 12 hours
      // staleTime: Infinity,
      throwOnError: false,
    },
  },
  queryCache: new QueryCache({
    onError: (err: any) => {
      const errMessage: any = err?.response?.data?.message?.reason || err?.message
      return errMessage
    },
  }),
})

const persister = createAsyncStoragePersister({
  storage: typeof window !== 'undefined' ? localStorage : null,
})

export const Provider = ({ children }: { children: ReactNode }) => {
  return (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      {children}
    </PersistQueryClientProvider>
  )
}

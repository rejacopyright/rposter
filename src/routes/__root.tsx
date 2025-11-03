import { createAsyncStoragePersister } from '@tanstack/query-async-storage-persister'
import { TanStackDevtools } from '@tanstack/react-devtools'
import { keepPreviousData, QueryCache, QueryClient } from '@tanstack/react-query'
import { PersistQueryClientProvider } from '@tanstack/react-query-persist-client'
import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools'

import Header from '../components/Header'
import TanStackQueryDevtools from '../integrations/tanstack-query/devtools'

interface MyRouterContext {
  queryClient: QueryClient
}

const queryClient = new QueryClient({
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

export const Route = createRootRouteWithContext<MyRouterContext>()({
  component: () => (
    <PersistQueryClientProvider client={queryClient} persistOptions={{ persister }}>
      <Header />
      <Outlet />
      <TanStackDevtools
        config={{ position: 'bottom-right' }}
        plugins={[
          { name: 'Tanstack Router', render: <TanStackRouterDevtoolsPanel /> },
          TanStackQueryDevtools,
        ]}
      />
    </PersistQueryClientProvider>
  ),
  context: () => {
    return { queryClient }
  },
})

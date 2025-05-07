import './App.css'

import { QueryClient, QueryClientProvider } from 'react-query'
import { MainPage } from './main-page.tsx'
import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 10 * 1000, // 1 second
      cacheTime: 60 * 60 * 24 * 7 * 1000, // 1 week
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainPage />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

export default App

import React from 'react'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import DefaultLayout from '../layouts/default-layout'

const App = ({ Component, pageProps }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <DefaultLayout>
          <DefaultSeo {...SEO} />
          <Component {...pageProps} />
        </DefaultLayout>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App

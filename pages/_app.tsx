import React, { useEffect, useState } from 'react'
import { DefaultSeo } from 'next-seo'
import SEO from '../next-seo.config'
import '../styles/globals.css'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import DefaultLayout from '../layouts/default-layout'
import AuthenticationLayout from '../layouts/authentication-layout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = ({ Component, pageProps }) => {
  const [windowExists, setWindowExists] = useState(false)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
      },
    },
  })

  useEffect(() => {
    setWindowExists(typeof window !== 'undefined')
  }, [])

  if (!windowExists) {
    return null
  }

  const isAuthPage = window.location.href.includes('auth')

  console.log('isAuthPage', isAuthPage)
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        {isAuthPage ? (
          <AuthenticationLayout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </AuthenticationLayout>
        ) : (
          <DefaultLayout>
            <DefaultSeo {...SEO} />
            <Component {...pageProps} />
          </DefaultLayout>
        )}
        <ToastContainer position="bottom-left" />
      </Hydrate>
    </QueryClientProvider>
  )
}

export default App

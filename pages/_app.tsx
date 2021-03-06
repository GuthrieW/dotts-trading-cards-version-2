import { CssBaseline } from '@material-ui/core'
import React from 'react'
import DefaultLayout from '../layouts/DefaultLayout'
import '../styles/globals.css'

const App = ({ Component, pageProps }) => {
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }, [])

  const getLayout =
    Component.layout || ((page) => <DefaultLayout children={page} />)

  return getLayout(
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  )
}

App.getLayout = App

export default App

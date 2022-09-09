import Router from 'next/router'
import React from 'react'
import useAuthentication from '../pages/api/v2/_queries/use-authentication'
import Footer from './footer'
import Header from './header'

const DefaultLayout = ({ children }) => {
  const { isAuthenticated, isFetching, error } = useAuthentication({})

  if (isFetching) {
    return null
  }

  if (error) {
    if (typeof window !== 'undefined') {
      Router.push('/auth/login')
    }
  }

  return (
    <div className="h-full w-full">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout

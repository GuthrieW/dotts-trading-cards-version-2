import Router from 'next/router'
import React from 'react'
import { toast } from 'react-toastify'
import useAuthentication from '../pages/api/v2/_queries/use-authentication'
import Footer from './footer'
import Header from './header'

const DefaultLayout = ({ children }) => {
  const { isAuthenticated, isFetching, error } = useAuthentication({})

  console.log(error)

  if (isFetching) {
    return null
  }

  if (error) {
    toast.warning('Error authenticating user')
    if (typeof window !== 'undefined') {
      Router.push('/auth/login')
    }
  }

  return (
    <div className="h-full w-full">
      <Header />
      <div className="mx-2">{children}</div>
      <Footer />
    </div>
  )
}

export default DefaultLayout

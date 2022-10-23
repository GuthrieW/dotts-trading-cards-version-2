import Router from 'next/router'
import React from 'react'
import Spinner from '../components/spinners/spinner'
import useAuthentication from '../pages/api/v2/_queries/use-authentication'
import Header from './header'

const DefaultLayout = ({ children }) => {
  const { permissions, isFetching, error } = useAuthentication({})

  if (isFetching) {
    return <Spinner />
  }

  if (
    window.location.href.includes('edit-cards') &&
    !permissions.isAdmin &&
    !permissions.isProcessor
  ) {
    Router.push('/dashboard')
  }

  if (
    window.location.href.includes('edit-users') &&
    !permissions.isAdmin &&
    !permissions.isPackIssuer
  ) {
    Router.push('/dashboard')
  }

  if (
    window.location.href.includes('issue-packs') &&
    !permissions.isAdmin &&
    !permissions.isPackIssuer
  ) {
    Router.push('/dashboard')
  }

  if (
    window.location.href.includes('process-cards') &&
    !permissions.isAdmin &&
    !permissions.isProcessor
  ) {
    Router.push('/dashboard')
  }

  if (
    window.location.href.includes('submit-cards') &&
    !permissions.isAdmin &&
    !permissions.isSubmitter
  ) {
    Router.push('/dashboard')
  }

  if (error) {
    if (typeof window !== 'undefined') {
      Router.push('/auth/login')
    }
  }

  return (
    <div className="h-full w-full">
      <Header />
      <div className="mx-2">{children}</div>
    </div>
  )
}

export default DefaultLayout

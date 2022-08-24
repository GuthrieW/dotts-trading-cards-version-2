import React from 'react'
import useGetCurrentUser from '../pages/api/v2/_queries/use-get-current-user'
import Footer from './footer'
import Header from './header'

const DefaultLayout = ({ children }) => {
  // const { currentUser, isFetching, error } = useGetCurrentUser({})

  // if (isFetching || error) {
  //   return null
  // }

  return (
    <div className="h-full w-full">
      <Header />
      {children}
      <Footer />
    </div>
  )
}

export default DefaultLayout

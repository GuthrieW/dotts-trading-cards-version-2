import { NextSeo } from 'next-seo'
import React from 'react'
import Spinner from '../../../components/spinners/spinner'
import useInsertTrade from '../../api/v2/_mutations/use-insert-trade'
import useGetAllUsers from '../../api/v2/_queries/use-get-all-users'
import useGetCurrentUser from '../../api/v2/_queries/use-get-current-user'

const NewTrade = () => {
  const { insertTrade, isSuccess, isLoading, reset } = useInsertTrade()
  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserIsError,
  } = useGetCurrentUser({})
  const {
    allUsers,
    isFetching: allUsersIsFetching,
    error: allUsersIsError,
  } = useGetAllUsers({})

  if (currentUserIsFetching || allUsersIsFetching) {
    return <Spinner />
  }

  return (
    <>
      <NextSeo title="New Trade" />
      <h1>New Trade</h1>
    </>
  )
}

export default NewTrade

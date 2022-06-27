import React from 'react'
import useGetAllUsers from '../api/v2/queries/use-get-all-users'
import useGetCurrentUser from '../api/v2/queries/use-get-current-user'

const NewTrade = () => {
  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserError,
  } = useGetCurrentUser({})
  const {
    allUsers,
    isFetching: allUsersIsFetching,
    error: allUsersError,
  } = useGetAllUsers({})
  return <div></div>
}

export default NewTrade

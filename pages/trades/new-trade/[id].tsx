import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import TradeSelectionGrid from '../../../components/grids/trade-selection-grid'
import Spinner from '../../../components/spinners/spinner'
import useInsertTrade from '../../api/v2/_mutations/use-insert-trade'
import useGetAllUsers from '../../api/v2/_queries/use-get-all-users'
import useGetCurrentUser from '../../api/v2/_queries/use-get-current-user'

const NewTrade = () => {
  const router = useRouter()
  const receivingUserId = router.query.id as string

  const { insertTrade, isSuccess, isLoading, reset } = useInsertTrade()
  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserIsError,
  } = useGetCurrentUser({})

  if (currentUserIsFetching) {
    return <Spinner />
  }

  return (
    <>
      <NextSeo title="New Trade" />
      <h1>New Trade</h1>
      <TradeSelectionGrid
        sendingUserId={currentUser._id}
        receivingUserId={receivingUserId}
      />
    </>
  )
}

export default NewTrade

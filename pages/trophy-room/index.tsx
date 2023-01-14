import React from 'react'
import { NextSeo } from 'next-seo'

import TrophyRoomGrid from '../../components/grids/trophy-room-grid'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import Spinner from '../../components/spinners/spinner'

const TrophyRoom = () => {
  const { currentUser, isFetching, error } = useGetCurrentUser({})

  if (isFetching) return <Spinner />

  return (
    <>
      <NextSeo title="Trophy Room" />
      <h1>Trophy Room</h1>
      <TrophyRoomGrid userId={currentUser._id} />
    </>
  )
}

export default TrophyRoom

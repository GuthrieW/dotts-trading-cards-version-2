import { useRouter } from 'next/router'
import React, { useState } from 'react'
import CollectionGrid from '../../comps/grids/collection-grid'
import useGetCardsOwnedByUser from '../api/v2/_queries/use-get-cards-owned-by-user'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Collection = () => {
  const router = useRouter()
  const user = router.query.user as string
  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserError,
  } = useGetCurrentUser({})
  const {
    cardsOwnedByUser,
    isFetching: cardsOwnedByUserIsFetching,
    error: cardsOwnedByUserError,
  } = useGetCardsOwnedByUser({})

  const isCurrentUser = user === currentUser.isflUsername

  return (
    <div>
      {isCurrentUser && cardsOwnedByUser.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">
            You don't have any cards in your collection.
          </p>
          <p className="text-xl">
            Go to the{' '}
            <a
              className="text-blue-500 hover:text-blue-600 transition-colors duration-200 my-4"
              href="/pack-shop"
            >
              pack shop
            </a>{' '}
            to get some packs!
          </p>
        </div>
      ) : (
        <CollectionGrid gridCards={cardsOwnedByUser} />
      )}
    </div>
  )
}

export default Collection

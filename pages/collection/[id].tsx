import { useRouter } from 'next/router'
import React from 'react'
import CollectionGrid from '../../comps/grids/collection-grid'
import useGetCardsOwnedByUser from '../api/v2/_queries/use-get-cards-owned-by-user'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Collection = () => {
  const router = useRouter()
  const userId = router.query.id as string

  const {
    isflUsername,
    cardsOwnedByUser,
    isFetching: cardsOwnedByUserIsFetching,
    error: cardsOwnedByUserError,
  } = useGetCardsOwnedByUser({
    id: userId,
  })

  const {
    currentUser,
    isFetching: currentUserIsFetching,
    error: currentUserError,
  } = useGetCurrentUser({})

  if (cardsOwnedByUserIsFetching || currentUserIsFetching) {
    return null
  }

  if (cardsOwnedByUserError || currentUserError) {
    return null
  }

  const isCurrentUser = userId === currentUser._id

  return (
    <div>
      {isCurrentUser ? (
        <h2>Your Collection</h2>
      ) : (
        <h2>{isflUsername}'s Collection</h2>
      )}
      {cardsOwnedByUser.length === 0 ? (
        <div className="text-center">
          <p className="text-xl">
            {isCurrentUser
              ? "You don't have any cards in your collection."
              : `${isflUsername} doesn't have any cards in their collection.`}
          </p>
          {isCurrentUser && (
            <p className="text-xl">
              Go to the{' '}
              <a
                className="text-blue-500 hover:text-blue-600 transition-colors duration-200 my-4"
                href="https://forums.sim-football.com/showthread.php?tid=25272"
              >
                pack shop
              </a>{' '}
              to get some packs!
            </p>
          )}
        </div>
      ) : (
        <CollectionGrid gridCards={cardsOwnedByUser} />
      )}
    </div>
  )
}

export default Collection

import { NextSeo } from 'next-seo'
import { useRouter } from 'next/router'
import React from 'react'
import CollectionGrid from '../../components/grids/collection-grid'
import Spinner from '../../components/spinners/spinner'
import useGetCardsOwnedByUser from '../api/v2/_queries/use-get-cards-owned-by-user'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Collection = () => {
  const router = useRouter()
  const userId = router.query.id as string

  const {
    isflUsername,
    cardsOwnedByUser,
    isFetching: cardsOwnedByUserIsFetching,
  } = useGetCardsOwnedByUser({
    id: userId,
  })

  const { currentUser, isFetching: currentUserIsFetching } = useGetCurrentUser(
    {}
  )

  if (cardsOwnedByUserIsFetching || currentUserIsFetching) {
    return <Spinner />
  }

  const isCurrentUser = userId === currentUser._id

  return (
    <>
      <NextSeo
        title={
          isCurrentUser ? 'Your Collection' : `${isflUsername}'s Collection}`
        }
      />
      <div>
        {isCurrentUser ? (
          <h1>Your Collection</h1>
        ) : (
          <h1>{isflUsername}'s Collection</h1>
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
    </>
  )
}

export default Collection

import React, { useState } from 'react'
import ButtonGroup from '../../comps/buttons/button-group'
import CollectionGrid from '../../comps/grids/collection-grid'
import useGetCardsOwnedByUser from '../api/v2/queries/use-get-cards-owned-by-user'
import TrophyRoom from '../_MyCards/TrophyRoom'

type CollectionPage = 'Collection' | 'Trophy Room'

type CollectionPageButton = {
  id: CollectionPage
  text: CollectionPage
  disabled: boolean
  onClick: Function
}

const Collection = () => {
  const { cardsOwnedByUser, isFetching, error } = useGetCardsOwnedByUser({})
  const [selectedButtonId, setSelectedButtonId] =
    useState<CollectionPage>('Collection')

  const collectionPageButtons: CollectionPageButton[] = [
    {
      id: 'Collection',
      text: 'Collection',
      disabled: selectedButtonId === 'Collection',
      onClick: () => {
        setSelectedButtonId('Collection')
      },
    },
    {
      id: 'Trophy Room',
      text: 'Trophy Room',
      disabled: selectedButtonId === 'Trophy Room',
      onClick: () => {
        setSelectedButtonId('Trophy Room')
      },
    },
  ]

  return (
    <div>
      <div className="flex">
        <ButtonGroup
          buttons={collectionPageButtons}
          selectedButtonId={selectedButtonId}
        />
      </div>
      {selectedButtonId === 'Collection' && (
        <CollectionGrid gridCards={cardsOwnedByUser} />
      )}
      {selectedButtonId === 'Trophy Room' && <TrophyRoom />}
    </div>
  )
}

export default Collection

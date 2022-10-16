import React from 'react'
import useGetLastOpenedPack from '../api/v2/_queries/use-get-last-opened-pack'
import Spinner from '../../components/spinners/spinner'
import ShinyImage from '../../components/images/shiny-image'

const StaticPackViewer = () => {
  const { lastOpenedPack, isFetching } = useGetLastOpenedPack({})

  if (isFetching) {
    return <Spinner />
  }

  return (
    <div className="flex justify-center items-start h-full">
      <div className="grid grid-cols-3 gap-4 py-6 w-1/2">
        {lastOpenedPack.map((card, index) => (
          <ShinyImage key={index} imageUrl={card.imageUrl} />
        ))}
      </div>
    </div>
  )
}

export default StaticPackViewer

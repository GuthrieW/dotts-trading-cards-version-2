import React from 'react'
import useGetLastOpenedPack from '../api/v2/_queries/use-get-last-opened-pack'
import { toast } from 'react-toastify'

const StaticPackViewer = () => {
  const { lastOpenedPack, isFetching, error } = useGetLastOpenedPack({})

  if (isFetching) {
    return null
  }

  console.log('lastOpenedPack', lastOpenedPack)

  return (
    <div className="flex justify-center items-start h-full">
      <div className="flex h-full flex-col sm:grid sm:grid-cols-3 lg:grid-cols-3 gap-4 overflow-x-auto py-6">
        {lastOpenedPack.map((card, index) => (
          <img
            width="320"
            height="440"
            key={index}
            draggable={false}
            className={`rounded-sm transition-all duration-200 select-none `}
            src={card.imageUrl}
          />
        ))}
      </div>
    </div>
  )
}

export default StaticPackViewer

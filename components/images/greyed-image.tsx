import React from 'react'

type GreyedImageProps = {
  imageUrl: string
  movementThreshold?: number
  onClick?: Function
}

const GreyedImage = ({ imageUrl }: GreyedImageProps) => {
  return (
    <div className="w-full h-full" style={{ transformStyle: 'preserve-3d' }}>
      <img
        loading="lazy"
        id="card-image"
        className="w-full h-full rounded-sm shadow-lg"
        style={{
          transformStyle: 'preserve-3d',
        }}
        src={imageUrl}
      />
      <div className=" absolute top-0 left-0 w-full h-full bg-gray-800 opacity-70"></div>
    </div>
  )
}

export default GreyedImage

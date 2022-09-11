import React from 'react'

type ShinyImageProps = {
  imageUrl: string
  movementThreshold
}

const ShinyImage = ({ imageUrl, movementThreshold = 100 }) => {
  const cardImageRef = React.useRef<HTMLImageElement>(null)
  const shineRef = React.useRef<HTMLDivElement>(null)
  return (
    <div
      className="w-full h-full relative motion-reduce:hover:transform-none"
      style={{ transformStyle: 'preserve-3d' }}
      onMouseMove={(event) => {
        const mouseX =
          event.nativeEvent.offsetX - cardImageRef.current.clientWidth / 2
        const mouseY =
          event.nativeEvent.offsetY - cardImageRef.current.clientHeight / 2

        cardImageRef.current.style.transform = `perspective(${
          cardImageRef.current.clientWidth
        }px) rotateX(${-mouseY / movementThreshold}deg) rotateY(${
          mouseX / movementThreshold
        }deg) scale3d(1, 1, 1)`
        shineRef.current.style.transform = `perspective(${
          cardImageRef.current.clientWidth
        }px) rotateX(${-mouseY / movementThreshold}deg) rotateY(${
          mouseX / movementThreshold
        }deg) scale3d(1, 1, 1)`
        shineRef.current.style.background = `radial-gradient(circle at ${event.nativeEvent.offsetX}px ${event.nativeEvent.offsetY}px, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 100%)`
      }}
      onMouseLeave={(event) => {
        cardImageRef.current.style.transform = `perspective(${cardImageRef.current.clientWidth}px) rotateX(0deg) rotateY(0deg)`
        shineRef.current.style.transform = `perspective(${cardImageRef.current.clientWidth}px) rotateX(0deg) rotateY(0deg)`
        shineRef.current.style.background = 'none'
      }}
    >
      <img
        ref={cardImageRef}
        id="card-image"
        className="w-full h-full rounded-sm shadow-lg motion-reduce:hover:transform-none"
        style={{
          transformStyle: 'preserve-3d',
        }}
        src={imageUrl}
      />
      <div
        ref={shineRef}
        id="shine"
        style={{
          transformStyle: 'preserve-3d',
        }}
        className="absolute w-full h-full top-0 left-0 motion-reduce:hover:transform-none motion-reduce:background-none motion-reduce:hover:background-none"
      />
    </div>
  )
}

export default ShinyImage

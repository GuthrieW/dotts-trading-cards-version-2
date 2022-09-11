import React from 'react'

export type TextIconProps = {}

const TextIcon = ({ children }) => {
  return (
    <div className="rounded-lg border border-gray-600">
      <p className="m-1">{children}</p>
    </div>
  )
}

export default TextIcon

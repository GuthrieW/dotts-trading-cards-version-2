import React from 'react'

const TextIcon = ({ text }) => {
  let color = 'border-gray-600 text-gray-600'
  if (text === 'COMPLETED') {
    color = 'border-green-600 text-green-600'
  } else if (text === 'PENDING') {
    color = 'border-yellow-600 text-yellow-600'
  } else if (text === 'DECLINED') {
    color = 'border-red-600 text-red-600'
  }
  return (
    <div className={`rounded-lg border ${color}`}>
      <p className="m-1">{text}</p>
    </div>
  )
}

export default TextIcon

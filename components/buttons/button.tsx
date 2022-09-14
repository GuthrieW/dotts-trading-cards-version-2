import React, { MouseEventHandler } from 'react'

type ButtonProps = {
  children: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
}

const Button = ({ children, onClick, isLoading }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
    >
      {children}
    </button>
  )
}

export default Button

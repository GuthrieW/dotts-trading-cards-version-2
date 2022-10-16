import React, { MouseEventHandler } from 'react'

type SubmitButtonProps = {
  onClick: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  children: any
}

const SubmitButton = ({ children, onClick, isLoading }: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={isLoading}
      className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
    >
      {children}
    </button>
  )
}

export default SubmitButton

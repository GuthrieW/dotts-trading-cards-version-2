import React, { MouseEventHandler } from 'react'

type SubmitButtonProps = {
  text: string
  onClick: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
}

const SubmitButton = ({ text, onClick, isLoading }: SubmitButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="submit"
      disabled={isLoading}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2"
    >
      {text}
    </button>
  )
}

export default SubmitButton

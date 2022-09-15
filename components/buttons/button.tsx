import React, { MouseEventHandler } from 'react'

type ButtonProps = {
  children: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  buttonType?: 'confirm' | 'warning' | 'default'
}

const Button = ({
  children,
  onClick,
  isLoading,
  buttonType = 'default',
}: ButtonProps) => {
  const color =
    buttonType === 'default'
      ? 'bg-blue-600 hover:bg-blue-700'
      : buttonType === 'confirm'
      ? 'bg-green-600 hover:bg-green-700'
      : buttonType === 'warning'
      ? 'bg-red-600 hover:bg-red-700'
      : null

  return (
    <button
      onClick={onClick}
      type="button"
      disabled={isLoading}
      className={`${color} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2`}
    >
      {children}
    </button>
  )
}

export default Button

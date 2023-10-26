import React, { MouseEventHandler } from 'react'

type ButtonProps = {
  children: any
  onClick?: MouseEventHandler<HTMLButtonElement>
  isLoading: boolean
  buttonType?: 'confirm' | 'warning' | 'default'
  disabled?: boolean
}

const Button = ({
  children,
  onClick,
  isLoading,
  buttonType = 'default',
  disabled = false,
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
      onClick={(event) => {
        if (!disabled && !isLoading) {
          return onClick(event)
        }
      }}
      type="button"
      disabled={disabled || isLoading}
      className={`${color} text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-2 disabled:bg-blue-800 disabled:text-gray-500`}
    >
      {children}
    </button>
  )
}

export default Button

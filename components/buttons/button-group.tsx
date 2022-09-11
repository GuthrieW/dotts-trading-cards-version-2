import React from 'react'

type ButtonProps = {
  id: string
  disabled: boolean
  onClick: Function
  text: string
}

export type ButtonGroupProps = {
  buttons: ButtonProps[]
  selectedButtonId: string
}

const getPositionalRounding = (index, numberOfButtons) => {
  if (index === 0) {
    return 'rounded-l-md'
  } else if (index === numberOfButtons - 1) {
    return 'rounded-r-md'
  } else {
    return ''
  }
}

const getIsSelected = (buttonId: string, selectedButtonId: string) =>
  buttonId === selectedButtonId
    ? 'bg-neutral-800 text-gray-100'
    : 'bg-white border text-neutral-800 hover:bg-gray-300 hover:text-neutral-800'

const ButtonGroup = ({ buttons, selectedButtonId }: ButtonGroupProps) => (
  <div className="inline-flex shadow-sm" role="group">
    {buttons.map((button, index) => (
      <button
        key={index}
        className={`${getPositionalRounding(
          index,
          buttons.length
        )} py-2 px-4 text-sm font-medium border-neutral-800  cursor-pointer ${getIsSelected(
          button.id,
          selectedButtonId
        )}`}
        disabled={button.disabled}
        onClick={() => button.onClick()}
      >
        {button.text}
      </button>
    ))}
  </div>
)

export default ButtonGroup

import React, { useState } from 'react'

type CheckboxProps = {
  id: string
  onClick: Function
  text: string
}

export type DropdownWithCheckboxGroupProps = {
  title: string
  checkboxes: CheckboxProps[]
  selectedCheckboxIds: string[]
}

const getIsSelected = (
  checkbox: CheckboxProps,
  selectedCheckboxIds: string[]
) => selectedCheckboxIds.includes(checkbox.id)

const getTotalSelected = (
  checkboxes: CheckboxProps[],
  selectedCheckboxIds: string[]
) =>
  selectedCheckboxIds.reduce((total, id) => {
    const checkbox = checkboxes.find((checkbox) => checkbox.id === id)
    return total + (checkbox ? 1 : 0)
  }, 0)

const DropdownWithCheckboxGroup = ({
  title,
  checkboxes,
  selectedCheckboxIds,
}: DropdownWithCheckboxGroupProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => setIsOpen(!isOpen)

  const totalSelected = getTotalSelected(checkboxes, selectedCheckboxIds)

  return (
    <div className="relative z-10 sm:m-2 border border-black rounded">
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none focus:shadow-outline"
        onClick={toggleIsOpen}
      >
        {totalSelected > 0 && (
          <span className="items-center px-2 text-xs font-medium leading-none text-white bg-neutral-800 rounded-full hidden sm:inline-flex">
            {totalSelected}
          </span>
        )}
        <span className="ml-2">{title}</span>
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full rounded-md shadow-lg">
          <div className="rounded-md bg-white shadow-xl">
            <div className="py-1">
              {checkboxes.map((checkbox, index) => (
                <div className="flex w-full px-2" key={index}>
                  <input
                    type="checkbox"
                    id={checkbox.id}
                    className="h-4 w-4 text-neutral-800 transition duration-150 ease-in-out"
                    checked={getIsSelected(checkbox, selectedCheckboxIds)}
                    onChange={() => checkbox.onClick()}
                  />
                  <label
                    htmlFor={checkbox.id}
                    className="ml-2 text-sm font-medium text-neutral-800"
                  >
                    {checkbox.text}
                  </label>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DropdownWithCheckboxGroup

import React, { useState } from 'react'

export type OptionProps = {
  id: string
  onClick: Function
  text: string
}

type SingleSelectDropdownProps = {
  title: String
  options: OptionProps[]
}

const SingleSelectDropdown = ({
  title,
  options,
}: SingleSelectDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleIsOpen = () => setIsOpen(!isOpen)

  return (
    <div className="relative z-10 sm:m-2 border border-black rounded">
      <button
        className="inline-flex items-center px-4 py-2 text-sm font-medium focus:outline-none focus:shadow-outline"
        onClick={toggleIsOpen}
      >
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
        <div className="absolute mt-1 rounded-md shadow-lg h-72 overflow-y-auto">
          <div className="rounded-md bg-white shadow-xl">
            <div className="py-1">
              {options.map((option, index) => (
                <div
                  className="flex w-full px-2 rounded hover:bg-neutral-400 cursor-pointer"
                  key={index}
                  onClick={() => option.onClick()}
                >
                  <label
                    htmlFor={option.id}
                    className="ml-2 text-sm font-medium text-neutral-800"
                  >
                    {option.text}
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

export default SingleSelectDropdown

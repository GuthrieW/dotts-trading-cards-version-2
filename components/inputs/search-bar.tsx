import React, { ChangeEventHandler } from 'react'

type SearchBarProps = {
  onChange: ChangeEventHandler<HTMLInputElement>
  disabled?: boolean
}

const SearchBar = ({ onChange, disabled }: SearchBarProps) => (
  <input
    className="my-2 px-2 h-8 rounded-md border border-black text-black font-normal text-base w-full min-w-0 mr-2"
    type="text"
    placeholder="Search"
    onChange={onChange}
    disabled={disabled}
  />
)

export default SearchBar

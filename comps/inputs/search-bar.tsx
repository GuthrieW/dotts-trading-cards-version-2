import React from 'react'

type SearchBarProps = {
  onChange: Function
}

const SearchBar = ({ onChange }) => (
  <input
    className="my-2 px-2 h-8 rounded-md border border-black text-black font-normal text-base w-full min-w-0"
    type="text"
    placeholder="Search"
    onChange={onChange}
  />
)

export default SearchBar

import React, { MouseEventHandler } from 'react'

type NavLinkProps = {
  children: any
  onClick?: MouseEventHandler
}

const NavLink = ({ children, onClick }: NavLinkProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex items-center mx-2 text-gray-100 cursor-pointer h-full border-b-4 border-neutral-800 ${
        onClick ? 'hover:border-b-4 hover:border-b-white' : ''
      }`}
    >
      {children}
    </div>
  )
}

export default NavLink

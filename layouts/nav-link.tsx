import React, { MouseEventHandler } from 'react'

type NavLinkProps = {
  children: any
  href?: string
  onClick?: Function
}

const NavLink = ({ children, href, onClick }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`flex items-center mx-2 text-gray-100 cursor-pointer h-full border-b-4 border-neutral-800 ${
        href || onClick ? 'hover:border-b-4 hover:border-b-white' : ''
      }`}
      onClick={() => onClick()}
    >
      {children}
    </a>
  )
}

export default NavLink

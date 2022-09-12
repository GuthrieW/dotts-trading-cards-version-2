import React, { MouseEventHandler } from 'react'

type NavLinkProps = {
  children: any
  href?: string
}

const NavLink = ({ children, href }: NavLinkProps) => {
  return (
    <a
      href={href}
      className={`flex items-center mx-2 text-gray-100 cursor-pointer h-full border-b-4 border-neutral-800 ${
        href ? 'hover:border-b-4 hover:border-b-white' : ''
      }`}
    >
      {children}
    </a>
  )
}

export default NavLink

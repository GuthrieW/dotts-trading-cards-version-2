import React from 'react'

type NavLinkProps = {
  children: any
  href?: string
}

const NavLink = ({ children, href }: NavLinkProps) => (
  <a
    href={href}
    className={`flex items-center mx-2 text-gray-100 h-full border-b-4 border-neutral-800 ${
      href ? 'hover:border-b-white cursor-pointer' : ''
    }`}
  >
    {children}
  </a>
)

export default NavLink

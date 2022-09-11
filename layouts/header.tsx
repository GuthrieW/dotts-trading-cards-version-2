import Router from 'next/router'
import React from 'react'
import useGetCurrentUser from '../pages/api/v2/_queries/use-get-current-user'
import NavLink from './nav-link'

type HeaderLink = {
  id: string
  headerText: string
  href: string
  admin: boolean
  cardTeam: boolean
}

const Header = () => {
  const { currentUser, isFetching, error } = useGetCurrentUser({})

  if (isFetching || error) {
    return null
  }

  const headersLinks: HeaderLink[] = [
    {
      id: 'collection',
      headerText: 'Collection',
      href: `/collection/${currentUser._id}`,
      admin: false,
      cardTeam: false,
    },
    {
      id: 'community',
      headerText: 'Community',
      href: '/community',
      admin: false,
      cardTeam: false,
    },
    {
      id: 'dashboard',
      headerText: 'Dashboard',
      href: '/dashboard',
      admin: false,
      cardTeam: false,
    },
    {
      id: 'open-packs',
      headerText: 'Open Packs',
      href: '/open-packs',
      admin: false,
      cardTeam: false,
    },
    {
      id: 'trades',
      headerText: 'Trades',
      href: '/trades',
      admin: false,
      cardTeam: false,
    },
  ]

  return (
    <header>
      <div className="relative justify-between top-0 w-full h-16 flex flex-row bg-neutral-800">
        <div className="flex w-full flex-row-reverse sm:flex-row items-center justify-between sm:justify-start relative ">
          <img
            src="/images/Dotts-Logo-White.png"
            onClick={() => Router.push('/dashboard')}
            className="h-16 cursor-pointer ml-2"
          />
          <div className=" sm:flex h-full w-full">
            {headersLinks.map((header, index) => (
              <NavLink key={index} onClick={() => Router.push(header.href)}>
                {header.headerText}
              </NavLink>
            ))}
          </div>
        </div>
        <div className="flex justify-center items-center text-gray-100 mr-2">
          {currentUser.isflUsername}
        </div>
      </div>
    </header>
  )
}

export default Header
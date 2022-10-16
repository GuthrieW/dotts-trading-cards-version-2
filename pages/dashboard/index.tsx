import { NextSeo } from 'next-seo'
import React from 'react'
import DashboardButton from '../../components/buttons/dashboard-button'
import { InfoButtonProps } from '../../components/buttons/info-button'
import Spinner from '../../components/spinners/spinner'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

type User = {
  isAdmin: boolean
  isProcessor: boolean
  isSubmitter: boolean
  isPackIssuer: boolean
}

type LinkProps = InfoButtonProps & {
  enabled?: (user: User) => boolean
}

const ExternalLinks: LinkProps[] = [
  {
    title: 'How to Purchase',
    body: 'Start here!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25272',
  },
  {
    title: 'Buy Packs',
    body: 'Buy a pack from the single purchase thread',
    href: 'https://forums.sim-football.com/forumdisplay.php?fid=366',
  },
  {
    title: 'Subscribe',
    body: 'Sign up for automatic pack purchases!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25283',
  },
]

const InternalLinks: LinkProps[] = [
  {
    title: 'Submit Cards for Review',
    href: '/dashboard/submit-cards',
    enabled: (user: User) => user.isAdmin || user.isSubmitter,
  },
  {
    title: 'Process Cards',
    href: '/dashboard/process-cards',
    enabled: (user: User) => user.isAdmin || user.isProcessor,
  },
  {
    title: 'Edit Cards',
    href: '/dashboard/edit-cards',
    enabled: (user: User) =>
      user.isAdmin || user.isSubmitter || user.isProcessor,
  },
  {
    title: 'Issue Packs',
    href: '/dashboard/issue-packs',
    enabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
  {
    title: 'Edit Users',
    href: '/dashboard/edit-users',
    enabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
]

const AdminDashboard = () => {
  const { currentUser, isFetching } = useGetCurrentUser({})

  const HeaderLinks: LinkProps[] = [
    {
      title: 'Collection',
      href: `/collection/${currentUser._id}`,
    },
    {
      title: 'Community',
      href: '/community',
    },
    {
      title: 'Open Packs',
      href: '/open-packs',
    },
    {
      title: 'Trades',
      href: '/trades',
    },
  ]

  if (isFetching) {
    return <Spinner />
  }

  return (
    <>
      <NextSeo title="Dashboard" />
      <h1>Dashboard</h1>
      <div className="flex flex-col justify-start items-center w-full">
        {ExternalLinks.map((link, index) => (
          <DashboardButton
            key={index}
            title={link.title}
            body={link.body}
            href={link.href}
          />
        ))}
        {HeaderLinks.map((link, index) => (
          <DashboardButton
            optionalClassnames="md:hidden"
            key={index}
            title={link.title}
            body={link.body}
            href={link.href}
          />
        ))}
        {InternalLinks.map((link, index) => {
          const isEnabled = link.enabled(currentUser)
          return isEnabled ? (
            <DashboardButton
              key={index}
              title={link.title}
              body={link.body}
              href={link.href}
            />
          ) : null
        })}
      </div>
    </>
  )
}

export default AdminDashboard

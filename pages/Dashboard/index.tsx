import React from 'react'
import { toast } from 'react-toastify'
import InfoButton, { InfoButtonProps } from '../../comps/buttons/info-button'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

type User = {
  isAdmin: boolean
  isProcessor: boolean
  isSubmitter: boolean
  isPackIssuer: boolean
}

type LinkProps = InfoButtonProps & {
  disabled?: (user: User) => boolean
}

const PageLinks: LinkProps[] = [
  {
    title: 'Process Cards',
    href: '/Dashboard/Processor',
    disabled: (user: User) => user.isAdmin || user.isProcessor,
  },
  {
    title: 'Submit Cards for Review',
    href: '/Dashboard/Submitter',
    disabled: (user: User) => user.isAdmin || user.isSubmitter,
  },
  {
    title: 'Issue Packs',
    href: '/Dashboard/Processor',
    disabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
  {
    title: 'Edit Cards',
    href: '/Dashboard/CardEditor',
    disabled: (user: User) =>
      user.isAdmin || user.isSubmitter || user.isProcessor,
  },
  {
    title: 'Edit Users',
    href: '/Dashboard/UserEditor',
    disabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
  {
    title: 'How to Purchase',
    body: 'Start here!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25272',
  },
  {
    title: 'Buy Packs',
    body: 'Build your collection with a new pack of cards! Find the Daily Pack Purchase thread.',
    href: 'https://forums.sim-football.com/forumdisplay.php?fid=366',
  },
  {
    title: 'Subscribe',
    body: 'Sign up for automatic pack purchases!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25283',
  },
]

const AdminDashboard = () => {
  const { currentUser, isFetching, error } = useGetCurrentUser({})

  if (error) {
    toast.warning('Error fetching user information')
  }

  return (
    <div>
      {PageLinks.map((pageLink: LinkProps) => {
        return pageLink.disabled(currentUser) ? null : (
          <InfoButton
            title={pageLink.title}
            body={pageLink.body}
            href={pageLink.href}
          />
        )
      })}
    </div>
  )
}

export default AdminDashboard

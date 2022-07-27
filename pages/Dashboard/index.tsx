import React from 'react'
import { toast } from 'react-toastify'
import InfoButton, { InfoButtonProps } from '../../comps/buttons/info-button'
// import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

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
    href: '/dashboard/process-cards',
    disabled: (user: User) => user.isAdmin || user.isProcessor,
  },
  {
    title: 'Submit Cards for Review',
    href: '/dashboard/submit-cards',
    disabled: (user: User) => user.isAdmin || user.isSubmitter,
  },
  {
    title: 'Issue Packs',
    href: '/dashboard/issue-packs',
    disabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
  {
    title: 'Edit Cards',
    href: '/dashboard/edit-cards',
    disabled: (user: User) =>
      user.isAdmin || user.isSubmitter || user.isProcessor,
  },
  {
    title: 'Edit Users',
    href: '/dashboard/edit-users',
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
  const { currentUser, isFetching, error } = {
    currentUser: {
      _id: '1234',
      isflUsername: 'caltroit_red_flames',
    },
    isFetching: false,
    error: null,
  }

  if (isFetching) {
    return null
  }

  if (error) {
    toast.warning('Error fetching user information')
  }

  return (
    <div>
      {PageLinks.map((pageLink: LinkProps) => {
        if (
          pageLink.disabled &&
          pageLink.disabled(currentUser as unknown as User)
        ) {
          return null
        } else {
          return (
            <InfoButton
              title={pageLink.title}
              body={pageLink.body}
              href={pageLink.href}
            />
          )
        }
      })}
    </div>
  )
}

export default AdminDashboard

import { NextSeo } from 'next-seo'
import React from 'react'
import { toast } from 'react-toastify'
import DashboardButton from '../../components/buttons/dashboard-button'
import InfoButton, {
  InfoButtonProps,
} from '../../components/buttons/info-button'
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

const UserLinks: LinkProps[] = [
  {
    title: 'How to Purchase',
    body: 'Start here!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25272',
    imageUrl:
      'https://cdn.vox-cdn.com/thumbor/Ndx21wLsWmumSaCq4HYTlIUzYW4=/37x0:368x186/1600x900/cdn.vox-cdn.com/uploads/chorus_image/image/55827969/VER_HowTo_RGB.0.png',
  },
  {
    title: 'Buy Packs',
    body: 'Build your collection with a new pack of cards! Find the Daily Pack Purchase thread.',
    href: 'https://forums.sim-football.com/forumdisplay.php?fid=366',
    imageUrl:
      'https://bloximages.chicago2.vip.townnews.com/pressrepublican.com/content/tncms/assets/v3/editorial/6/88/688104dc-29ae-5e66-ad56-41ee0800409d/622296c991739.image.jpg',
  },
  {
    title: 'Subscribe',
    body: 'Sign up for automatic pack purchases!',
    href: 'https://forums.sim-football.com/showthread.php?tid=25283',
    imageUrl: 'https://i.ytimg.com/vi/froV-FcSQjc/maxresdefault.jpg',
  },
]

const EmployeeLinks: LinkProps[] = [
  {
    title: 'Process Cards',
    href: '/dashboard/process-cards',
    // disabled: (user: User) => user.isAdmin || user.isProcessor,
  },
  {
    title: 'Submit Cards for Review',
    href: '/dashboard/submit-cards',
    // disabled: (user: User) => user.isAdmin || user.isSubmitter,
  },
  {
    title: 'Issue Packs',
    href: '/dashboard/issue-packs',
    // disabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
]

const AdminLinks: LinkProps[] = [
  {
    title: 'Edit Cards',
    href: '/dashboard/edit-cards',
    // disabled: (user: User) =>
    // user.isAdmin || user.isSubmitter || user.isProcessor,
  },
  {
    title: 'Edit Users',
    href: '/dashboard/edit-users',
    // disabled: (user: User) => user.isAdmin || user.isPackIssuer,
  },
]

const AdminDashboard = () => {
  const { currentUser, isFetching, error } = useGetCurrentUser({})

  if (isFetching) {
    return null
  }

  if (error) {
    toast.error('Error fetching user information')
  }

  return (
    <>
      <NextSeo title="Dashboard" />
      <h1>Dashboard</h1>
      <div className="flex flex-col justify-start items-center w-full">
        {UserLinks.map((link) => (
          <DashboardButton
            title={link.title}
            body={link.body}
            href={link.href}
          />
        ))}
        {EmployeeLinks.map((link) => (
          <DashboardButton
            title={link.title}
            body={link.body}
            href={link.href}
          />
        ))}
        {AdminLinks.map((link) => (
          <DashboardButton
            title={link.title}
            body={link.body}
            href={link.href}
          />
        ))}
      </div>
      {/* <div className="m-2">
        <div className="grid grid-cols-3 gap-4">
          {UserLinks.map((pageLink: LinkProps, index) => {
            if (
              pageLink.disabled &&
              pageLink.disabled(currentUser as unknown as User)
            ) {
              return null
            } else {
              return (
                <InfoButton
                  key={index}
                  title={pageLink.title}
                  body={pageLink.body}
                  href={pageLink.href}
                  imageUrl={pageLink.imageUrl}
                />
              )
            }
          })}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {EmployeeLinks.map((pageLink: LinkProps, index) => {
            if (
              pageLink.disabled &&
              pageLink.disabled(currentUser as unknown as User)
            ) {
              return null
            } else {
              return (
                <InfoButton
                  key={index}
                  title={pageLink.title}
                  body={pageLink.body}
                  href={pageLink.href}
                  imageUrl={pageLink.imageUrl}
                />
              )
            }
          })}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {AdminLinks.map((pageLink: LinkProps, index) => {
            if (
              pageLink.disabled &&
              pageLink.disabled(currentUser as unknown as User)
            ) {
              return null
            } else {
              return (
                <InfoButton
                  key={index}
                  title={pageLink.title}
                  body={pageLink.body}
                  href={pageLink.href}
                  imageUrl={pageLink.imageUrl}
                />
              )
            }
          })}
        </div>
      </div> */}
    </>
  )
}

export default AdminDashboard

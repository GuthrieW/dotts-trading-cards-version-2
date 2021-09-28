import {
  BottomNavigationActionProps,
  Button,
  LinkProps,
} from '@material-ui/core'
import React from 'react'
import Link from 'next/link'

export type BottomNavigationActionLinkProps = Omit<
  BottomNavigationActionProps,
  'href' | 'classes'
>

export const BottomNavigationActionLink = React.forwardRef<
  BottomNavigationActionLinkProps,
  any
>(({ href, as, prefetch, ...props }, ref) => (
  <Link href={href} as={as} prefetch={prefetch} passHref>
    <Button ref={ref} {...props} style={{ fontSize: '.6rem' }} />
  </Link>
))

BottomNavigationActionLink.displayName = 'BottomNavigationActionLink'

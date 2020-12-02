import { BottomNavigationActionProps, Button, LinkProps } from "@material-ui/core"
import React from "react"
import Link from "next/link"

export type BottomNavigationActionLinkProps = Omit<BottomNavigationActionProps, 'href' | 'classes'> &
  Pick<LinkProps, 'href' | 'as' | 'prefetch'>

export const BottomNavigationActionLink = React.forwardRef<BottomNavigationActionLinkProps, any>(
  ({ href, as, prefetch, ...props }, ref) => (
    <Link href={href} as={as} prefetch={prefetch} passHref>
      <Button ref={ref} {...props} />
    </Link>
  )
)

BottomNavigationActionLink.displayName = 'BottomNavigationActionLink'

import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import React, { useState } from 'react';
import useStyles from '../pages/index.styles';
import CommunityIcon from '../public/icons/CommunityIcon';
import MyCardsIcon from '../public/icons/MyCardsIcon';
import OpenPacksIcon from '../public/icons/OpenPacksIcon';
import Link from 'next/link';

const BottomNavigationActionLink = ({ className, href, hrefAs, children, prefetch }) => (
  <Link href={href} as={hrefAs} prefetch>
    <a className={className}>
      {children}
    </a>
  </Link>
)


const DefaultLayout = ({ children }) => {
  const customClass = useStyles();
  const [value, setValue] = useState();

  return (
    <>
      <h1>Hello World this is layout</h1>
      {children}
      <BottomNavigation
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        showLabels
        className={customClass.footer}
      >
        <Link href={'MyCards'}>
          <a>
            <BottomNavigationAction label="My Cards" className={customClass.navButton} icon={<MyCardsIcon />} />
          </a>
        </Link>
        <Link href={'OpenPacks'}>
          <a>
            <BottomNavigationAction label="Open Packs" className={customClass.navButton} icon={<OpenPacksIcon />} />
          </a>
        </Link>
        <Link href={'Community'}>
          <a>
            <BottomNavigationAction label="Community" className={customClass.navButton} icon={<CommunityIcon />} />
          </a>
        </Link>
      </BottomNavigation>
    </>
  )
}

export const getLayout = page => <DefaultLayout>{page}</DefaultLayout>

export default DefaultLayout;
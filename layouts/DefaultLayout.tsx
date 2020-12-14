import {
  BottomNavigation,
  BottomNavigationAction,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from '../pages/index.styles'
import CommunityIcon from '../public/icons/CommunityIcon'
import MyCardsIcon from '../public/icons/MyCardsIcon'
import OpenPacksIcon from '../public/icons/OpenPacksIcon'
import { signOut, useSession } from 'next-auth/client'
import { BottomNavigationActionLink } from '../components/BottomNavigationActionLink'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import { DOTTS_USER_ID_STORAGE } from '../utils/constants'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const DefaultLayout = ({ children }) => {
  const customClass = useStyles()
  const [value, setValue] = useState(0)
  const [session, loading] = useSession()

  if (loading) return null

  if (session) {
    localStorage.setItem(DOTTS_USER_ID_STORAGE, session.user.id)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {!loading && !session && <SplashScreen />}
      {session && (
        <>
          Signed in as {session.user.email} <br />
          <button onClick={signOut}>Sign out</button>
          {children}
          <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue)
            }}
            showLabels
            className={customClass.footer}
          >
            <BottomNavigationAction
              component={BottomNavigationActionLink}
              href={'/MyCards'}
              label="My Cards"
              icon={<MyCardsIcon />}
            />
            <BottomNavigationAction
              component={BottomNavigationActionLink}
              href={'/OpenPacks'}
              label="Open Packs"
              icon={<OpenPacksIcon />}
            />
            <BottomNavigationAction
              component={BottomNavigationActionLink}
              href={'/Community'}
              label="Community"
              icon={<CommunityIcon />}
            />
          </BottomNavigation>
        </>
      )}
    </ThemeProvider>
  )
}

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default DefaultLayout

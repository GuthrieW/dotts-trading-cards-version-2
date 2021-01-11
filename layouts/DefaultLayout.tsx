import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  createMuiTheme,
  ThemeProvider,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
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
import SidebarNav from '../components/SidebarNav'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const DefaultLayout = ({ children }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [session, loading] = useSession()

  const updateValue = (val) => {
    setValue(val);
  }
  const theme = useTheme();
  const lgUp = useMediaQuery(theme.breakpoints.up("lg"));

  if (loading) return null

  if (session) {
    localStorage.setItem(DOTTS_USER_ID_STORAGE, session.user.id)
  }

  return (
    <ThemeProvider theme={darkTheme}>
      {!loading && !session && <SplashScreen />}
      {session && (
        <>
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                  {session.user.email}
                  <button onClick={signOut}>Sign out</button>
                </Typography>
              </Toolbar>
            </AppBar>
            {lgUp &&
              <SidebarNav value={value} updateTabValue={updateValue} sessionValue={session} />
            }
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
            {!lgUp &&
              <>
                < BottomNavigation
                  value={value}
                  onChange={(event, newValue) => {
                    setValue(newValue)
                  }}
                  showLabels
                  className={classes.footer}
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
            }
          </div>
        </>
      )
      }
    </ThemeProvider >
  )
}

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default DefaultLayout

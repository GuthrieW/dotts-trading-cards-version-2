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
  Button,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import useStyles from '../pages/index.styles'
import CommunityIcon from '../public/icons/CommunityIcon'
import MyCardsIcon from '../public/icons/MyCardsIcon'
import OpenPacksIcon from '../public/icons/OpenPacksIcon'
// import { signOut, useSession } from 'next-auth/client'
import { BottomNavigationActionLink } from '../components/BottomNavigationActionLink'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import ForgotPassword from '../components/Authentication/ForgotPassword'
import LogIn from '../components/Authentication/LogIn'
import PasswordReset from '../components/Authentication/PasswordReset'
import SignUp from '../components/Authentication/SignUp'
import SidebarNav from '../components/SidebarNav'
import axios from 'axios'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../utils/constants'
import { useRouter } from 'next/router'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

const DefaultLayout = ({ children }) => {
  const classes = useStyles()
  const pathname = useRouter().pathname
  const [value, setValue] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [innerComponent, setInnerComponent] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/authorization/checkAuthorization`,
        data: {},
      })

      if (result.data.error) {
        setIsLoggedIn(false)
      } else {
        setIsLoggedIn(true)
      }

      if (pathname === '/Authorization/LogIn') {
        setInnerComponent(<LogIn />)
      } else if (pathname === '/Authorization/SignUp') {
        setInnerComponent(<SignUp />)
      } else if (pathname === '/Authorization/ForgotPassword') {
        setInnerComponent(<ForgotPassword />)
      } else if (pathname === '/Authorization/PasswordReset') {
        setInnerComponent(<PasswordReset />)
      } else {
        setInnerComponent(null)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem(DOTTS_ACCESS_TOKEN)
  }

  const updateValue = (val) => {
    setValue(val)
  }
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  if (isLoading) return null

  return (
    <ThemeProvider theme={darkTheme}>
      {!isLoggedIn && <SplashScreen>{innerComponent}</SplashScreen>}
      {isLoggedIn && (
        <>
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                  <Button onClick={handleSignOut}>Sign out</Button>
                </Typography>
              </Toolbar>
            </AppBar>
            {lgUp && <SidebarNav value={value} updateTabValue={updateValue} />}
            <main className={classes.content}>
              <div className={classes.toolbar} />
              {children}
            </main>
            {!lgUp && (
              <>
                <BottomNavigation
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
            )}
          </div>
        </>
      )}
    </ThemeProvider>
  )
}

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default DefaultLayout

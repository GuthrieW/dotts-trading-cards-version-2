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
import ForgotPassword from '../pages/Authentication/ForgotPassword'
import LogIn from '../pages/Authentication/LogIn'
import PasswordReset from '../pages/Authentication/PasswordReset'
import SignUp from '../pages/Authentication/SignUp'
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
  const [value, setValue] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSplashScreen, setIsSplashScreen] = useState(false)
  const [isLogInScreen, setIsLoginScreen] = useState(false)
  const [isSignUpScreen, setIsSignUpScreen] = useState(false)
  const [isPasswordResetScreen, setIsPasswordResetScreen] = useState(false)
  const [isForgotPassword, setIsForgotPasswordScreen] = useState(false)

  const pathname = useRouter().pathname

  console.log(pathname)
  if (pathname === '/') {
    setIsSplashScreen(true)
  } else if (pathname === '/Authentication/LogIn') {
    setIsLoginScreen(true)
  } else if (pathname === '/Authentication/SignUp') {
    setIsSignUpScreen(true)
  } else if (pathname === '/Authentication/PasswordReset') {
    setIsPasswordResetScreen(true)
  } else if (pathname === '/Authentication/ForgotPassword') {
    setIsForgotPasswordScreen(true)
  }

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
      } else {
        setIsLoggedIn(true)
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
      {!isLoggedIn && isSplashScreen && <SplashScreen />}
      {!isLoggedIn && isLogInScreen && <LogIn />}
      {!isLoggedIn && isSignUpScreen && <SignUp />}
      {!isLoggedIn && isPasswordResetScreen && <PasswordReset />}
      {!isLoggedIn && isForgotPassword && <ForgotPassword />}
      {isLoggedIn && (
        <>
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.appBar}>
              <Toolbar>
                <Typography variant="h6" noWrap>
                  {/* {session.user.email} */}
                  <Button onClick={handleSignOut}>Sign out</Button>
                </Typography>
              </Toolbar>
            </AppBar>
            {lgUp && (
              <SidebarNav
                value={value}
                updateTabValue={updateValue}
                // sessionValue={session}
              />
            )}
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

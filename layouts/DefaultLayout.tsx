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
import { BottomNavigationActionLink } from '../components/BottomNavigationActionLink'
import SplashScreen from '../components/SplashScreen/SplashScreen'
import SidebarNav from '../components/SidebarNav'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../utils/constants'
import Link from 'next/link'
import Router, { useRouter } from 'next/router'
import TradingIcon from '../public/icons/TradingIcon'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
})

export const UserContext = React.createContext(null)

const handleSetNavValueOnLoad = (path) => {
  switch (path) {
    case 'MyCards':
      return 0
    case 'OpenPacks':
      return 1
    case 'Community':
      return 2
    case 'Trading':
      return 3
    default:
      return 0
  }
}

const DefaultLayout = ({ children }) => {
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    if (router && router.pathname) {
      setValue(handleSetNavValueOnLoad(router.pathname.split('/')[1]))
    }
  }, [router])

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/authorization/checkAuthorization`,
        data: {},
      })

      if (result.data.error) {
        setIsLoggedIn(false)
      } else {
        setUserEmail(result.data.email)
        setIsLoggedIn(true)
      }

      setIsLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/currentUser`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)
    }

    fetchData()
  }, [])

  const handleSignOut = () => {
    localStorage.removeItem(DOTTS_ACCESS_TOKEN)
    Router.push({
      pathname: `/Authentication/LogIn`,
    })
  }

  const updateValue = (val) => {
    setValue(val)
  }
  const theme = useTheme()
  const lgUp = useMediaQuery(theme.breakpoints.up('lg'))

  if (isLoading) return null

  return (
    <UserContext.Provider value={userEmail}>
      <ThemeProvider theme={darkTheme}>
        {!isLoggedIn && <SplashScreen />}
        {isLoggedIn && (
          <>
            <div className={classes.root}>
              <AppBar position={'fixed'} className={classes.appBar}>
                <Toolbar>
                  <Link href="/">
                    <div className={classes.headerLogoContainer}>
                      {!lgUp && (
                        <img
                          className={classes.headerLogo}
                          src="/images/Dotts-Logo-White.png"
                        />
                      )}
                    </div>
                  </Link>
                  <Typography variant="h6" noWrap>
                    <Button onClick={handleSignOut}>Sign out</Button>
                  </Typography>
                </Toolbar>
              </AppBar>
              {lgUp && (
                <SidebarNav
                  value={value}
                  updateTabValue={updateValue}
                  currentUser={currentUser}
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
                    className={classes.footer}
                  >
                    <BottomNavigationAction
                      component={BottomNavigationActionLink}
                      href={'/MyCards'}
                      label="Collection"
                      icon={<MyCardsIcon />}
                    />
                    <BottomNavigationAction
                      component={BottomNavigationActionLink}
                      href={'/OpenPacks'}
                      label="Packs"
                      icon={<OpenPacksIcon />}
                    />
                    <BottomNavigationAction
                      component={BottomNavigationActionLink}
                      href={'/Community'}
                      label="Community"
                      icon={<CommunityIcon />}
                    />
                    {currentUser && (
                      <BottomNavigationAction
                        component={BottomNavigationActionLink}
                        href={'/Trading'}
                        label="Trading"
                        icon={<TradingIcon />}
                      />
                    )}
                  </BottomNavigation>
                </>
              )}
            </div>
          </>
        )}
      </ThemeProvider>
    </UserContext.Provider>
  )
}

export const getLayout = (page) => <DefaultLayout>{page}</DefaultLayout>

export default DefaultLayout

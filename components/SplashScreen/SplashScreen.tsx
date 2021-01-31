import { Box, ButtonGroup, Button, Link } from '@material-ui/core'
import React from 'react'
import useStyles from './SplashScreen.styles'
import Router from 'next/router'

const SplashScreen = ({ children }) => {
  const classes = useStyles()

  const handleOnClick = () => {
    console.log('clicked')
    Router.push({
      pathname: '/Authentication/LogIn',
    })
  }

  return (
    <div className={classes.splashScreenWrapper}>
      <Box className={classes.overlayContainer}>
        {!children && (
          <>
            <img
              className={classes.dottsLogo}
              src="/images/Dotts-Logo-White.png"
            />
            <p className={classes.subtitle}>
              Dotts is a trading card platform for the International Simulation
              Football League
            </p>
            <Box className={classes.buttonContainer}>
              <ButtonGroup
                fullWidth
                orientation="vertical"
                size="large"
                aria-label="small outlined button group"
              >
                <Box m={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handleOnClick}
                  >
                    Log In
                  </Button>
                </Box>
                <Box m={2}>
                  <Link href="https://forums.sim-football.com/showthread.php?tid=25272">
                    Get Started
                  </Link>
                </Box>
              </ButtonGroup>
            </Box>
          </>
        )}
        {children && <>{children}</>}
      </Box>
      <Box>
        <div className={classes.gradient}></div>
        <video
          className={classes.splashScreenVideo}
          src="/videos/infinite-dotts.webm"
          autoPlay
          loop
          playsInline
          muted
        ></video>
      </Box>
    </div>
  )
}

export default SplashScreen

import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  splashScreenWrapper: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  overlayContainer: {
    background: 'transparent',
    position: 'absolute',
    height: '100vh',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.up('md')]: {
      background: '#303030',
      position: 'static',
      width: '50%',
      paddingTop: '100px',
    },
  },
  dottsLogo: {
    objectFit: 'contain',
    maxWidth: '375px',
    zIndex: 3,
  },
  subtitle: {
    zIndex: 3,
    color: 'white',
    maxWidth: '75%',
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1.5,
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: '#303030',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 3,
    textAlign: 'center',
    [theme.breakpoints.up('md')]: {
      position: 'static',
      width: '50%',
    },
  },
  wrapper: {
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.up('md')]: {
      position: 'static',
      width: '50%',
    },
  },
  gradient: {
    height: 'calc(100vh - 80px)',
    width: '100%',
    position: 'relative',
    objectFit: 'cover',
    zIndex: 2,
    background:
      'linear-gradient(to bottom, rgba(218, 218, 218, 0.52), rgba(18, 18, 18, 0.73))',
    [theme.breakpoints.up('md')]: {
      position: 'absolute',
      maxWidth: '50%',
      height: '100%',
      background:
        'linear-gradient(to left, rgba(218, 218, 218, 0.52), rgba(48, 48, 48, 1))',
    },
  },
  splashScreenVideo: {
    position: 'absolute',
    height: ' calc(100vh - 80px)',
    top: 0,
    zIndex: -1,
    width: '100%',
    objectFit: 'cover',
    [theme.breakpoints.up('md')]: {
      width: '50%',
      height: '100%',
      right: 0,
    },
  },
}))

export default useStyles

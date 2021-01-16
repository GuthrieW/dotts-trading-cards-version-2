import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  content: {
    padding: 0,
  },
  packViewerContainer: {
    boxSizing: 'border-box',
    overscrollBehaviorY: 'contain',
    margin: '0',
    padding: '0',
    height: '100%',
    width: '100%',
    userSelect: 'none',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial, sans-serif',
    position: 'fixed',
    overflow: 'hidden',
  },
  packContainer: {
    position: 'fixed',
    overflow: 'hidden',
    width: '100%',
    height: '100%',
    cursor:
      'url(`https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png`) 39 39, auto',
    paddingTop: '40px',
  },
  cardContainer: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    willChange: 'transform',
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: 'white',
    backgroundSize: 'auto 100%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center center',
    width: '45vh',
    maxWidth: '300px',
    height: '100vh',
    maxHeight: '420px',
    willChange: 'transform',
    borderRadius: '2px',
  },
}))

export default useStyles

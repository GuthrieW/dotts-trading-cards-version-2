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

// * {
//   box-sizing: border-box;
// }

// html,
// body {
//   overscroll-behavior-y: contain;
//   margin: 0;
//   padding: 0;
//   height: 100%;
//   width: 100%;
//   user-select: none;
//   font-family: -apple-system, BlinkMacSystemFont, avenir next, avenir, helvetica neue, helvetica, ubuntu, roboto, noto, segoe ui, arial,
//     sans-serif;
//   position: fixed;
//   overflow: hidden;
// }

// #root {
//   background: lightblue;
//   position: fixed;
//   overflow: hidden;
//   width: 100%;
//   height: 100%;
//   cursor: url('https://uploads.codesandbox.io/uploads/user/b3e56831-8b98-4fee-b941-0e27f39883ab/Ad1_-cursor.png') 39 39, auto;
// }

// #root > div {
//   position: absolute;
//   width: 100vw;
//   height: 100vh;
//   will-change: transform;
//   display: flex;
//   align-items: center;
//   justify-content: center;
// }

// #root > div > div {
//   background-color: white;
//   background-size: auto 85%;
//   background-repeat: no-repeat;
//   background-position: center center;
//   width: 45vh;
//   max-width: 300px;
//   height: 85vh;
//   max-height: 570px;
//   will-change: transform;
//   border-radius: 10px;
//   box-shadow: 0 12.5px 100px -10px rgba(50, 50, 73, 0.4), 0 10px 10px -10px rgba(50, 50, 73, 0.3);
// }

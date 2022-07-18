// import { Box, ButtonGroup, Button, Link } from '@material-ui/core'
// import React from 'react'
// import useStyles from './SplashScreen.styles'
// import SplashLayout from '../../layouts/SplashLayout'

// const SplashScreen = () => {
//   const classes = useStyles()

//   return (
//     <div className={classes.splashScreenWrapper}>
//       <Box className={classes.overlayContainer}>
//         <img className={classes.dottsLogo} src="/images/Dotts-Logo-White.png" />
//         <p className={classes.subtitle}>
//           Dotts is a trading card platform for the International Simulation
//           Football League
//         </p>
//         <Box className={classes.buttonContainer}>
//           <ButtonGroup
//             fullWidth
//             orientation="vertical"
//             size="large"
//             aria-label="small outlined button group"
//           >
//             <Box m={2}>
//               <Link href="/Authentication/LogIn">
//                 <Button variant="contained" color="primary" fullWidth>
//                   Log In
//                 </Button>
//               </Link>
//             </Box>
//             <Box m={2}>
//               <Link href="https://forums.sim-football.com/showthread.php?tid=25272">
//                 Get Started
//               </Link>
//             </Box>
//           </ButtonGroup>
//         </Box>
//       </Box>
//       <Box>
//         <div className={classes.gradient}></div>
//         <video
//           className={classes.splashScreenVideo}
//           src="/videos/infinite-dotts.webm"
//           autoPlay
//           loop
//           playsInline
//           muted
//         ></video>
//       </Box>
//     </div>
//   )
// }

// SplashScreen.layout = () => <SplashLayout children={<SplashScreen />} />

// export default SplashScreen

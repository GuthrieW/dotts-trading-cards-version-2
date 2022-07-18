// import React from 'react'
// import {
//   AppBar,
//   Toolbar,
//   Card,
//   CardContent,
//   createMuiTheme,
//   ThemeProvider,
//   Box,
// } from '@material-ui/core'
// import useStyles from '../pages/index.styles'
// import Link from 'next/link'

// const darkTheme = createMuiTheme({
//   palette: {
//     type: 'dark',
//   },
// })

// const SplashLayout = ({ children }) => {
//   const classes = useStyles()

//   return (
//     <ThemeProvider theme={darkTheme}>
//       <div style={{ display: 'flex' }}>
//         <AppBar position="fixed">
//           <Toolbar>
//             <div
//               style={{
//                 display: 'flex',
//                 flexGrow: 1,
//               }}
//             >
//               <Link href="/Authentication/LogIn">
//                 <img
//                   className={classes.headerLogo}
//                   src="/images/Dotts-Logo-White.png"
//                 />
//               </Link>
//             </div>
//           </Toolbar>
//         </AppBar>
//         <Box
//           style={{
//             height: '100vh',
//             display: 'flex',
//             flexDirection: 'column',
//             alignItems: 'center',
//             background: '#303030',
//             position: 'static',
//             width: '100%',
//             paddingTop: '100px',
//           }}
//         >
//           <Box
//             style={{
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               width: '50%',
//             }}
//           >
//             <Card>
//               <CardContent>{children}</CardContent>
//             </Card>
//           </Box>
//         </Box>
//       </div>
//     </ThemeProvider>
//   )
// }

// export default SplashLayout

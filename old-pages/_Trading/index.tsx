// import {
//   Box,
//   Card,
//   CardActionArea,
//   Chip,
//   Divider,
//   Grid,
//   LinearProgress,
//   Typography,
//   Snackbar,
// } from '@material-ui/core'
// import { Alert, Color } from '@material-ui/lab'
// import { useQuery } from 'react-query'
// import React, { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/router'
// import { formatDistance, parseISO, subDays } from 'date-fns'
// import ActionButton from '../../components/ActionButton/ActionButton'
// import { getCurrentUser, getTradesByUser } from '../../utils/requestTemplates'

// const getChipColor = (tradeStatus) => {
//   switch (tradeStatus) {
//     case 'pending':
//       return 'primary'
//     case 'declined':
//       return 'secondary'
//     default:
//       return 'default'
//   }
// }

// const MyTrades = () => {
//   const router = useRouter()
//   const [tradeFilter, setTradeFilter] = useState('pending')
//   const {
//     isLoading: currentUserLoading,
//     error: currentUserError,
//     data: currentUserData,
//   } = useQuery('getCurrentUser', async () => {
//     const response = await getCurrentUser()
//     return response
//   })

//   const handleChipClick = (filter = null) => {
//     if (filter) {
//       setTradeFilter(filter)
//     } else {
//       setTradeFilter(null)
//     }
//   }
//   const currentUserVal = !currentUserLoading && currentUserData.data.account._id

//   const {
//     isLoading: tradesByUserLoading,
//     error: tradesByUserError,
//     data: tradesByUserData,
//   } = useQuery(
//     ['tradesByUser', currentUserVal],
//     async () => {
//       const response = await getTradesByUser(currentUserVal)
//       return response
//     },
//     { enabled: !!currentUserVal }
//   )

//   if (tradesByUserLoading) return <LinearProgress />

//   if (currentUserError || tradesByUserError)
//     return `An error has occurred: ${currentUserError || tradesByUserError}`

//   return (
//     <Box mb={20} pl={2} pr={2}>
//       <Grid container direction="column">
//         <h1>My Trades</h1>
//         <h3>Filter by Trade Status: </h3>
//         <Box mb={5}>
//           <Chip
//             variant="outlined"
//             label={'All Trades'}
//             onClick={() => handleChipClick()}
//           />{' '}
//           <Chip
//             label={'Pending'}
//             color={getChipColor('pending')}
//             onClick={() => handleChipClick('pending')}
//           />{' '}
//           <Chip
//             label={'Declined'}
//             color={getChipColor('declined')}
//             onClick={() => handleChipClick('declined')}
//           />{' '}
//           <Chip
//             label={'Completed'}
//             onClick={() => handleChipClick('completed')}
//           />
//         </Box>
//       </Grid>
//       {tradesByUserData &&
//         tradesByUserData.data &&
//         tradesByUserData.data.length > 0 &&
//         tradesByUserData.data
//           .sort(
//             (a, b) =>
//               new Date(b.tradeOfferDate).getTime() -
//               new Date(a.tradeOfferDate).getTime()
//           )
//           .filter((trade) =>
//             tradeFilter ? trade.tradeStatus === tradeFilter : trade
//           )
//           .map((trade, index) => {
//             const {
//               offeringUserId,
//               receivingUserId,
//               offeringUserInfo,
//               receivingUserInfo,
//               offeringUserCardIds,
//               receivingUserCardIds,
//               tradeStatus,
//               tradeOfferDate,
//             } = trade
//             const isUserTrade = offeringUserId === currentUserVal
//             return (
//               <Box key={index} mb={2}>
//                 <Card key={index}>
//                   <Link
//                     href={`/Trading/MyTrades/${encodeURIComponent(trade._id)}`}
//                   >
//                     <CardActionArea>
//                       <Box p={2} mb={2}>
//                         <Grid
//                           container
//                           alignItems="flex-start"
//                           direction="column"
//                         >
//                           <Grid
//                             container
//                             direction="row"
//                             alignItems="center"
//                             justifyContent="space-between"
//                           >
//                             <Typography variant="h4" component="h2">
//                               {isUserTrade ? 'Outgoing' : 'Incoming'}
//                             </Typography>
//                             <Chip
//                               label={tradeStatus}
//                               color={getChipColor(tradeStatus)}
//                             />
//                           </Grid>
//                           <Grid item>
//                             <Typography
//                               color="textSecondary"
//                               variant="subtitle2"
//                               component="h6"
//                             >
//                               Trade with{' '}
//                               {isUserTrade
//                                 ? receivingUserInfo.length > 0 &&
//                                   receivingUserInfo[0].isflUsername
//                                 : offeringUserInfo.length > 0 &&
//                                   offeringUserInfo[0].isflUsername}{' '}
//                               -{' '}
//                               {formatDistance(
//                                 subDays(parseISO(tradeOfferDate), 0),
//                                 new Date(),
//                                 {
//                                   addSuffix: true,
//                                 }
//                               )}
//                             </Typography>
//                           </Grid>
//                         </Grid>
//                       </Box>
//                       <Divider />
//                       <Box p={2} mt={2}>
//                         <Grid container spacing={2}>
//                           <Grid item>
//                             <Typography variant="h5" component="h3">
//                               {isUserTrade ? 'Your' : 'Their'} Offer:{' '}
//                             </Typography>
//                             {offeringUserCardIds.map((card, index) => (
//                               <div
//                                 key={`${offeringUserId}-${tradeOfferDate}-${index}`}
//                               >
//                                 {card.playerName} ({card.rarity}){' '}
//                               </div>
//                             ))}
//                           </Grid>
//                           <Grid item>
//                             <Typography variant="h5" component="h3">
//                               {isUserTrade ? 'Your' : 'Their'} Request:{' '}
//                             </Typography>
//                             {receivingUserCardIds.map((card, index) => (
//                               <div
//                                 key={`${receivingUserId}-${tradeOfferDate}-${index}`}
//                               >
//                                 {card.playerName} ({card.rarity})
//                               </div>
//                             ))}
//                           </Grid>
//                         </Grid>
//                       </Box>
//                     </CardActionArea>
//                   </Link>
//                 </Card>
//               </Box>
//             )
//           })}
//       <ActionButton
//         onClick={(e) => {
//           e.preventDefault()
//           router.push('/Trading/NewTrade')
//         }}
//         label={'Create New Trade'}
//       />
//       {router.query.message && (
//         <Snackbar open={Boolean(router.query.message)} autoHideDuration={4000}>
//           <Alert severity={router.query.severity as Color}>
//             {router.query.message}
//           </Alert>
//         </Snackbar>
//       )}
//     </Box>
//   )
// }

// export default MyTrades

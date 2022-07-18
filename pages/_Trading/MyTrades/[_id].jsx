// import React, { useState } from 'react'
// import { Backdrop, CircularProgress } from '@material-ui/core'
// import axios from 'axios'
// import { useQuery } from 'react-query'
// import { useRouter } from 'next/router'
// import { makeStyles } from '@material-ui/core/styles'
// import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
// import {
//   Avatar,
//   Box,
//   Button,
//   Card,
//   Chip,
//   Divider,
//   Grid,
//   Typography,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   LinearProgress,
//   List,
//   ListItem,
//   ListItemAvatar,
//   ListItemText,
// } from '@material-ui/core'
// import { formatDistance, parseISO, subDays } from 'date-fns'
// import { getCurrentUser, getTradeById } from '../../../utils/requestTemplates'

// const useStyles = makeStyles((theme) => ({
//   backdrop: {
//     zIndex: theme.zIndex.drawer + 1,
//     color: '#fff',
//   },
// }))

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

// const declineTrade = async (tradeId) => {
//   await axios({
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//     },
//     method: 'post',
//     url: `/api/v1/trades/updateTrade`,
//     data: {
//       tradeId: tradeId,
//       tradeStatus: 'declined',
//     },
//   })

//   return
// }

// const transactTrade = async (
//   offeringUserId,
//   offeringUserCardIds,
//   receivingUserId,
//   receivingUserCardIds,
//   _id,
//   setTransactionLoading,
//   setTransactionMessage
// ) => {
//   setTransactionLoading(true)
//   const response = await axios({
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//     },
//     method: 'post',
//     url: `/api/v1/trades/transactTrade`,
//     data: {
//       offeringUserId: offeringUserId,
//       offeringUserCardIds: offeringUserCardIds,
//       receivingUserId: receivingUserId,
//       receivingUserCardIds: receivingUserCardIds,
//       _id: _id,
//     },
//   })

//   setTransactionLoading(false)

//   if (response.data.error) {
//     setTransactionMessage({
//       severity: 'error',
//       message: response.data.error,
//     })
//   }

//   if (response.data.status) {
//     setTransactionMessage({
//       severity: 'success',
//       message: response.data.status,
//     })
//   }
//   return response
// }

// const deleteTrade = async (currentTrade) => {
//   await axios({
//     headers: {
//       Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//     },
//     method: 'post',
//     url: `/api/v1/trades/deleteTrade`,
//     data: { tradeId: currentTrade },
//   })

//   return
// }

// const TradePage = () => {
//   const router = useRouter()
//   const { _id } = router.query
//   const [dialogOpen, setDialogOpen] = useState(false)
//   const [transactionLoading, setTransactionLoading] = useState(false)
//   const [transactionMessage, setTransactionMessage] = useState({
//     severity: '',
//     message: '',
//   })

//   const classes = useStyles()

//   const {
//     isLoading: currentUserLoading,
//     error: currentUserError,
//     data: currentUserData,
//   } = useQuery('getCurrentUser', async () => {
//     const response = await getCurrentUser()
//     return response
//   })

//   const currentUserVal = !currentUserLoading && currentUserData.data.account._id

//   const {
//     isLoading: tradeByIdLoading,
//     error: tradeByIdError,
//     data: tradeByIdData,
//   } = useQuery(
//     ['tradeById'],
//     async () => {
//       const response = await getTradeById(_id)
//       return response
//     },
//     { enabled: !!currentUserVal }
//   )

//   const handleOpen = () => {
//     setDialogOpen(true)
//   }

//   const handleClose = () => {
//     setDialogOpen(false)
//   }

//   const handleDeclineTrade = async (tradeId) => {
//     setDialogOpen(false)
//     await declineTrade(tradeId)
//     router.push('/Trading')
//   }

//   const handleDeleteTrade = async (tradeId) => {
//     setDialogOpen(false)
//     await deleteTrade(tradeId)
//     router.push('/Trading')
//   }

//   const handleAcceptTrade = async (
//     offeringUserId,
//     offeringUserCardIds,
//     receivingUserId,
//     receivingUserCardIds,
//     setTransactionLoading,
//     setTransactionMessage
//   ) => {
//     await transactTrade(
//       offeringUserId,
//       offeringUserCardIds,
//       receivingUserId,
//       receivingUserCardIds,
//       _id,
//       setTransactionLoading,
//       setTransactionMessage
//     )

//     router.push({
//       pathname: '/Trading',
//       query: {
//         message: transactionMessage.message,
//         severity: transactionMessage.severity,
//       },
//     })
//   }

//   if (tradeByIdLoading) return <LinearProgress />

//   if (currentUserError || tradeByIdError) return `An error has occurred`

//   const currentTrade =
//     tradeByIdData && tradeByIdData.data && tradeByIdData.data[0]

//   const isUserTrade =
//     tradeByIdData &&
//     tradeByIdData.data &&
//     tradeByIdData.data[0].offeringUserId === currentUserData.data.account._id

//   if (currentTrade) {
//     const {
//       offeringUserInfo,
//       offeringUserCardIds,
//       receivingUserCardIds,
//       receivingUserInfo,
//       offeringUserId,
//       receivingUserId,
//       tradeOfferDate,
//     } = currentTrade

//     return (
//       <Box mb={2}>
//         <Card>
//           <Box p={2} mb={2}>
//             <Grid container alignItems="flex-start" direction="column">
//               <Grid
//                 container
//                 direction="row"
//                 alignItems="center"
//                 justifyContent="space-between"
//               >
//                 <Typography variant="h4" component="h2">
//                   {isUserTrade ? 'Outgoing' : 'Incoming'}
//                 </Typography>
//                 <Chip
//                   label={currentTrade.tradeStatus}
//                   color={getChipColor(currentTrade.tradeStatus)}
//                 />
//               </Grid>
//               <Grid item>
//                 <Typography
//                   color="textSecondary"
//                   variant="subtitle2"
//                   component="h6"
//                 >
//                   Trade with{' '}
//                   {isUserTrade
//                     ? receivingUserInfo[0].isflUsername
//                     : offeringUserInfo[0].isflUsername}{' '}
//                   -{' '}
//                   {formatDistance(
//                     subDays(parseISO(tradeOfferDate), 0),
//                     new Date(),
//                     {
//                       addSuffix: true,
//                     }
//                   )}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </Box>
//           <Divider />
//           <Box p={2} mt={2}>
//             <Grid container spacing={2}>
//               <Grid item>
//                 <Typography variant="h5" component="h3">
//                   {isUserTrade ? 'Your' : 'Their'} Offer:{' '}
//                 </Typography>
//                 <List>
//                   {offeringUserCardIds.map((card, index) => (
//                     <ListItem
//                       key={`${offeringUserId}-${tradeOfferDate}-${index}`}
//                     >
//                       <ListItemAvatar>
//                         {card.imageUrl ? (
//                           <Avatar src={card.imageUrl} />
//                         ) : (
//                           <ImageIcon />
//                         )}
//                       </ListItemAvatar>
//                       <ListItemText
//                         id={card.labelId}
//                         primary={`${card.playerName} (${card.rarity})`}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Grid>
//               <Grid item>
//                 <Typography variant="h5" component="h3">
//                   {isUserTrade ? 'Your' : 'Their'} Request:{' '}
//                 </Typography>
//                 <List>
//                   {receivingUserCardIds.map((card, index) => (
//                     <ListItem
//                       key={`${receivingUserId}-${tradeOfferDate}-${index}`}
//                     >
//                       <ListItemAvatar>
//                         {card.imageUrl ? (
//                           <Avatar src={card.imageUrl} />
//                         ) : (
//                           <ImageIcon />
//                         )}
//                       </ListItemAvatar>
//                       <ListItemText
//                         id={card.labelId}
//                         primary={`${card.playerName} (${card.rarity})`}
//                       />{' '}
//                     </ListItem>
//                   ))}
//                 </List>
//               </Grid>
//             </Grid>
//           </Box>
//         </Card>
//         <Box mt={2}>
//           {currentUserData &&
//             currentUserData.data.account &&
//             currentTrade &&
//             currentUserData.data.account._id === offeringUserId && (
//               <>
//                 <Button
//                   size="small"
//                   color="secondary"
//                   onClick={() => handleOpen()}
//                 >
//                   Delete Trade
//                 </Button>
//                 <Dialog
//                   open={dialogOpen}
//                   onClose={handleClose}
//                   aria-labelledby="alert-dialog-title"
//                   aria-describedby="alert-dialog-description"
//                 >
//                   <DialogTitle id="alert-dialog-title">
//                     {'Delete Trade?'}
//                   </DialogTitle>
//                   <DialogContent>
//                     <DialogContentText id="alert-dialog-description">
//                       Are you sure you would like to delete this trade?
//                     </DialogContentText>
//                   </DialogContent>
//                   <DialogActions>
//                     <Button
//                       onClick={() => setDialogOpen(false)}
//                       color="secondary"
//                     >
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={() => handleDeleteTrade(currentTrade._id)}
//                       color="primary"
//                       autoFocus
//                     >
//                       Delete Trade
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </>
//             )}
//           {currentUserData &&
//             currentUserData.data.account &&
//             currentTrade &&
//             currentUserData.data.account._id !== offeringUserId &&
//             currentTrade.tradeStatus === 'pending' && (
//               <>
//                 <Button
//                   size="small"
//                   color="secondary"
//                   disabled={transactionLoading}
//                   onClick={() =>
//                     handleAcceptTrade(
//                       offeringUserId,
//                       offeringUserCardIds.map((card) => card._id),
//                       receivingUserId,
//                       receivingUserCardIds.map((card) => card._id),
//                       setTransactionLoading,
//                       setTransactionMessage
//                     )
//                   }
//                 >
//                   Accept
//                 </Button>
//                 <Button
//                   size="small"
//                   color="secondary"
//                   disabled={transactionLoading}
//                   onClick={() => handleDeclineTrade(currentTrade._id)}
//                 >
//                   Decline
//                 </Button>
//               </>
//             )}
//         </Box>
//         <Backdrop className={classes.backdrop} open={transactionLoading}>
//           <CircularProgress color="inherit" />
//         </Backdrop>
//       </Box>
//     )
//   }
//   return null
// }

// export default TradePage

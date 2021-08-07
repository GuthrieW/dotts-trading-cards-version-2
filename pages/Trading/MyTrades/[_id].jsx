import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import { useRouter } from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import {
  Box,
  Button,
  Card,
  Chip,
  Divider,
  Grid,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  LinearProgress,
} from '@material-ui/core'
import { formatDistance, parseISO, subDays } from 'date-fns'
import { getCurrentUser, getTradeById } from '../../../utils/requestTemplates'

const getChipColor = (tradeStatus) => {
  switch (tradeStatus) {
    case 'pending':
      return 'primary'
    case 'declined':
      return 'secondary'
    default:
      return 'default'
  }
}

const declineTrade = async (tradeId) => {
  await axios({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
    },
    method: 'post',
    url: `/api/v1/trades/updateTrade`,
    data: {
      tradeId: tradeId,
      tradeStatus: 'declined',
    },
  })

  return
}

const transactTrade = async (
  offeringUserId,
  offeringUserCardIds,
  receivingUserId,
  receivingUserCardIds,
  _id
) => {
  await axios({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
    },
    method: 'post',
    url: `/api/v1/trades/transactTrade`,
    data: {
      offeringUserId: offeringUserId,
      offeringUserCardIds: offeringUserCardIds,
      receivingUserId: receivingUserId,
      receivingUserCardIds: receivingUserCardIds,
      _id: _id,
    },
  })

  return
}

const deleteTrade = async (currentTrade) => {
  await axios({
    headers: {
      Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
    },
    method: 'post',
    url: `/api/v1/trades/deleteTrade`,
    data: { tradeId: currentTrade },
  })

  return
}

const TradePage = () => {
  const router = useRouter()
  const { _id } = router.query
  const [dialogOpen, setDialogOpen] = useState(false)

  const {
    isLoading: currentUserLoading,
    error: currentUserError,
    data: currentUserData,
  } = useQuery('getCurrentUser', async () => {
    const response = await getCurrentUser()
    return response
  })

  const currentUserVal = !currentUserLoading && currentUserData.data.account._id

  const {
    isLoading: tradeByIdLoading,
    error: tradeByIdError,
    data: tradeByIdData,
  } = useQuery(
    ['tradeById'],
    async () => {
      const response = await getTradeById(_id)
      return response
    },
    { enabled: !!currentUserVal }
  )

  const handleOpen = () => {
    setDialogOpen(true)
  }

  const handleClose = () => {
    setDialogOpen(false)
  }

  const handleDeclineTrade = async (tradeId) => {
    setDialogOpen(false)
    await declineTrade(tradeId)
    router.push('/Trading')
  }

  const handleDeleteTrade = async (tradeId) => {
    setDialogOpen(false)
    await deleteTrade(tradeId)
    router.push('/Trading')
  }

  const handleAcceptTrade = async (
    offeringUserId,
    offeringUserCardIds,
    receivingUserId,
    receivingUserCardIds
  ) => {
    await transactTrade(
      offeringUserId,
      offeringUserCardIds,
      receivingUserId,
      receivingUserCardIds,
      _id
    )
  }

  if (tradeByIdLoading) return <LinearProgress />

  if (currentUserError || tradeByIdError) return `An error has occurred`

  const currentTrade =
    tradeByIdData && tradeByIdData.data && tradeByIdData.data[0]

  const isUserTrade =
    tradeByIdData &&
    tradeByIdData.data &&
    tradeByIdData.data[0].offeringUserId === currentUserData.data.account._id

  if (currentTrade) {
    const {
      offeringUserInfo,
      offeringUserCardIds,
      receivingUserCardIds,
      receivingUserInfo,
      offeringUserId,
      receivingUserId,
      tradeOfferDate,
    } = currentTrade

    return (
      <Box mb={2}>
        <Card>
          <Box p={2} mb={2}>
            <Grid container alignItems="flex-start" direction="column">
              <Grid
                container
                direction="row"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="h4" component="h2">
                  {isUserTrade ? 'Outgoing' : 'Incoming'}
                </Typography>
                <Chip
                  label={currentTrade.tradeStatus}
                  color={getChipColor(currentTrade.tradeStatus)}
                />
              </Grid>
              <Grid item>
                <Typography
                  color="textSecondary"
                  variant="subtitle2"
                  component="h6"
                >
                  Trade with{' '}
                  {isUserTrade
                    ? receivingUserInfo[0].isflUsername
                    : offeringUserInfo[0].isflUsername}{' '}
                  -{' '}
                  {formatDistance(
                    subDays(parseISO(tradeOfferDate), 0),
                    new Date(),
                    {
                      addSuffix: true,
                    }
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Box>
          <Divider />
          <Box p={2} mt={2}>
            <Grid container spacing={2}>
              <Grid item>
                <Typography variant="h5" component="h3">
                  {isUserTrade ? 'Your' : 'Their'} Offer:{' '}
                </Typography>
                {offeringUserCardIds.map((card, index) => (
                  <div key={`${offeringUserId}-${tradeOfferDate}-${index}`}>
                    {card.playerName} ({card.rarity}){' '}
                  </div>
                ))}
              </Grid>
              <Grid item>
                <Typography variant="h5" component="h3">
                  {isUserTrade ? 'Your' : 'Their'} Request:{' '}
                </Typography>
                {receivingUserCardIds.map((card, index) => (
                  <div key={`${receivingUserId}-${tradeOfferDate}-${index}`}>
                    {card.playerName} ({card.rarity})
                  </div>
                ))}
              </Grid>
            </Grid>
          </Box>
        </Card>
        <Box mt={2}>
          {currentUserData &&
            currentUserData.data.account &&
            currentTrade &&
            currentUserData.data.account._id === offeringUserId && (
              <>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleOpen()}
                >
                  Delete Trade
                </Button>
                <Dialog
                  open={dialogOpen}
                  onClose={handleClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {'Delete Trade?'}
                  </DialogTitle>
                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Are you sure you would like to delete this trade?
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button
                      onClick={() => setDialogOpen(false)}
                      color="secondary"
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => handleDeleteTrade(currentTrade._id)}
                      color="primary"
                      autoFocus
                    >
                      Delete Trade
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}
          {currentUserData &&
            currentUserData.data.account &&
            currentTrade &&
            currentUserData.data.account._id !== offeringUserId &&
            currentTrade.tradeStatus === 'pending' && (
              <>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() =>
                    handleAcceptTrade(
                      offeringUserId,
                      offeringUserCardIds.map((card) => card._id),
                      receivingUserId,
                      receivingUserCardIds.map((card) => card._id)
                    )
                  }
                >
                  Accept
                </Button>
                <Button
                  size="small"
                  color="secondary"
                  onClick={() => handleDeclineTrade(currentTrade._id)}
                >
                  Decline
                </Button>
              </>
            )}
        </Box>
      </Box>
    )
  }
  return null
}

export default TradePage

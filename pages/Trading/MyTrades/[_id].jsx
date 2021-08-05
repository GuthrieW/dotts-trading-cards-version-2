import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

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
  const [currentTrade, setCurrentTrade] = useState(null)
  const [currentUser, setCurrentUser] = useState(null)
  const [offeringUserId, setOfferingUserId] = useState('')
  const [receivingUserId, setReceivingUserId] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)

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

  useEffect(() => {
    const fetchTrade = async () => {
      const tradeById = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/trades/tradeById`,
        data: { _id: _id },
      })

      setCurrentTrade(tradeById.data[0])
    }

    fetchTrade()
  }, [])

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

  return (
    <Box mt={2}>
      <div>Trade Page for {_id}</div>
      <div>Trade Status: {currentTrade && currentTrade.tradeStatus} </div>
      <div>
        OfferingUser:{' '}
        {currentTrade && currentTrade.offeringUserInfo[0].isflUsername}
      </div>
      {currentUser &&
        currentTrade &&
        currentUser._id === currentTrade.offeringUserId && (
          <>
            <Button size="small" color="secondary" onClick={() => handleOpen()}>
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
                <Button onClick={() => setDialogOpen(false)} color="secondary">
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
      {currentUser &&
        currentTrade &&
        currentUser._id !== currentTrade.offeringUserId &&
        currentTrade.tradeStatus === 'pending' && (
          <>
            <Button
              size="small"
              color="secondary"
              onClick={() =>
                handleAcceptTrade(
                  currentTrade.offeringUserId,
                  currentTrade.offeringUserCardIds.map((card) => card._id),
                  currentTrade.receivingUserId,
                  currentTrade.receivingUserCardIds.map((card) => card._id)
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
  )
}

export default TradePage

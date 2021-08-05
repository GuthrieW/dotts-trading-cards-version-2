import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import axios from 'axios'
import ActionButton from '../../components/ActionButton/ActionButton'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'
import Router from 'next/router'

const useStyles = makeStyles((theme) => ({
  root: {
    margin: 'auto',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
      flexDirection: 'column',
    },
  },
  title: {
    textAlign: 'center',
    marginBottom: 8,
  },
  paper: {
    width: 400,
    height: 230,
    overflow: 'auto',
  },
  button: {
    margin: theme.spacing(0.5, 0),
  },
}))

function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

export default function TransferList(props) {
  const classes = useStyles()
  const [checked, setChecked] = useState([])
  const [left, setLeft] = useState([])
  const [userCards, setUserCards] = useState([])
  const [tradePartnerCards, setTradePartnerCards] = useState([])
  const [right, setRight] = useState([4, 5, 6, 7])
  const [open, setOpen] = useState(false)
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const apiCallOptions = {
        url: `/api/v1/users/currentUser`,
        data: {},
      }

      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: apiCallOptions.url,
        data: apiCallOptions.data,
      })

      if (user.data.error) {
      }

      let cardIds = user.data.account.ownedCards

      const userCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/cards/cards`,
        data: { cardIds: cardIds },
      })

      if (userCards.data.error) {
      }
      setLeft(userCards.data)
      setUserCards(userCards.data)
    }

    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const apiCallOptions = {
        url: `/api/v1/users/singleUser/`,
        data: {
          isflUsername: props.tradePartner.email,
        },
      }

      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: apiCallOptions.url,
        data: apiCallOptions.data,
      })

      if (user.data.error) {
      }

      let cardIds = user.data.ownedCards

      const userCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/cards/cards`,
        data: { cardIds: cardIds },
      })

      if (userCards.data.error) {
      }
      setRight(userCards.data)
      setTradePartnerCards(userCards.data)
    }

    fetchData()
  }, [props.tradePartner])

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

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    if (currentIndex === -1) {
      newChecked.push(value)
    } else {
      newChecked.splice(currentIndex, 1)
    }

    setChecked(newChecked)
  }

  const handleAllRight = () => {
    setRight(right.concat(left))
    setLeft([])
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleAllLeft = () => {
    setLeft(left.concat(right))
    setRight([])
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCreateTradeProposal = async () => {
    setOpen(false)
    console.log('offeringUserId', currentUser._id)
    console.log('receivingUserId', props.tradePartner.id)
    console.log('offeringUserCardIds', leftChecked)
    console.log('receivingUserCardIds', rightChecked)
    const trades = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `/api/v1/trades/insertTrade`,
      data: {
        offeringUserId: currentUser._id,
        receivingUserId: props.tradePartner.id,
        offeringUserCardIds: leftChecked,
        receivingUserCardIds: rightChecked,
      },
    })

    if (trades.data.error) {
    } else {
      Router.reload()
    }
  }

  const customList = (items, isUser) => (
    <>
      <Paper>
        <div className={classes.title}>
          {isUser ? 'Your Cards' : 'Trade Partner Cards'}
        </div>
      </Paper>
      <Paper className={classes.paper}>
        <List dense component="div" role="list">
          {items.map((value, index) => {
            const { playerName, rarity, playerTeam } = value
            const labelId = `transfer-list-item-${value}-label`

            return (
              <ListItem
                key={value.playerName + index}
                role="listitem"
                button
                onClick={handleToggle(value)}
              >
                <ListItemIcon>
                  <Checkbox
                    checked={checked.indexOf(value) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${playerName} (${rarity})`}
                />
              </ListItem>
            )
          })}
          <ListItem />
        </List>
      </Paper>
    </>
  )

  return (
    <Grid
      container
      spacing={2}
      justifyContent="space-evenly"
      alignItems="center"
      className={classes.root}
    >
      <Grid item>{customList(userCards, true)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center"></Grid>
      </Grid>
      <Grid item>{customList(tradePartnerCards, false)}</Grid>
      {leftChecked.length > 0 && rightChecked.length > 0 && (
        <ActionButton onClick={handleOpen} label="Propose Trade" />
      )}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle id="alert-dialog-title">
          {'Propose this trade?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <b>You trade away:</b>
          </DialogContentText>
          {leftChecked.map((item) => (
            <DialogContentText>
              {item.playerName} ({item.rarity})
            </DialogContentText>
          ))}
          <DialogContentText>
            <b>You get:</b>
          </DialogContentText>
          {rightChecked.map((item) => (
            <DialogContentText>
              {item.playerName} ({item.rarity})
            </DialogContentText>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Disagree
          </Button>
          <Button onClick={handleCreateTradeProposal} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  )
}

import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Dialog,
  DialogContent,
  makeStyles,
  Checkbox,
  Fab,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import useStyles from './Processor.styles'
import Router from 'next/router'

/**
 * This page needs to display one or more cards that are not approved and offer the ability
 * to either approve it or delete it from the dotts_cards collection.
 */

const ProcessorPage = () => {
  const classes = useStyles()

  const [unapprovedCards, setUnapprovedCards] = useState([])
  const [open, setOpen] = useState(false)
  const [currentCard, setCurrentCard] = useState('')
  const [selected, setSelected] = React.useState([])

  useEffect(() => {
    const fetchUnapprovedCards = async () => {
      const fetchedCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/cards/unapprovedCards`,
        data: [],
      })

      setUnapprovedCards(fetchedCards.data)
    }

    fetchUnapprovedCards()
  }, [])

  const handleClick = (name) => {
    setCurrentCard(name)
    setOpen(true)
  }

  const handleRowClick = (event, name) => {
    const selectedIndex = selected.indexOf(name)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }

    setSelected(newSelected)
  }

  const handleCloseCard = () => {
    setOpen(false)
  }

  const isSelected = (name) => selected.indexOf(name) !== -1

  const handleApproveCards = async () => {
    const approvedCards = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${API_URL}/api/v1/cards/approveCards`,
      data: { selectedCardIds: selected },
    })

    if (approvedCards.data.error) {
    } else {
      Router.reload()
    }
  }

  const handleDeleteCard = async (cardIdToDelete) => {
    const deletedCard = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${API_URL}/api/v1/cards/deleteCard`,
      data: { cardId: cardIdToDelete },
    })

    if (deletedCard.data.error) {
    } else {
      setUnapprovedCards(
        unapprovedCards.filter((cardId) => cardId !== cardIdToDelete)
      )
      Router.reload()
    }
  }

  return (
    <>
      <h1>Processor Page</h1>
      {(!unapprovedCards || unapprovedCards.length === 0) && (
        <div>There are currently no unapproved cards. Check back later!</div>
      )}
      {unapprovedCards && unapprovedCards.length > 0 && (
        <>
          {selected.length > 0 && (
            <Fab
              color="primary"
              variant="extended"
              className={classes.actionButton}
              onClick={handleApproveCards}
            >
              Approve {selected.length} cards
            </Fab>
          )}
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Approve?</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Card View</TableCell>
                <TableCell>Team</TableCell>
                <TableCell>Rarity</TableCell>
                <TableCell>Submitter</TableCell>
                <TableCell>In current rotation?</TableCell>
                <TableCell>Delete Submission</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {unapprovedCards.map((card) => {
                const isItemSelected = isSelected(card._id)

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={card._id}
                    selected={isItemSelected}
                  >
                    <TableCell
                      padding="checkbox"
                      onClick={(event) => handleRowClick(event, card._id)}
                    >
                      <Checkbox checked={isItemSelected} />
                    </TableCell>
                    <TableCell component="th" scope="row">
                      {card.playerName}
                    </TableCell>
                    <TableCell>
                      <>
                        <Button onClick={() => handleClick(card.imageUrl)}>
                          View card
                        </Button>
                      </>
                    </TableCell>
                    <TableCell>{card.playerTeam}</TableCell>
                    <TableCell>{card.rarity}</TableCell>
                    <TableCell>{card.submissionUsername}</TableCell>
                    <TableCell>{card.currentRotation.toString()}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={() => {
                          handleDeleteCard(card._id)
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
          <Dialog
            open={open}
            onClose={handleCloseCard}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogContent>
              <img className={classes.cardImage} src={currentCard} />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  )
}

export default ProcessorPage

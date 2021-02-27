import React, { useEffect, useState } from 'react'
import MUIDataTable from 'mui-datatables'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  Switch,
} from '@material-ui/core'
import { RARITIES, TEAMS } from '../../../utils/constants'

const CARD_ID_INDEX = 0
const PLAYER_NAME_INDEX = 1
const PLAYER_TEAM_INDEX = 2
const CARD_RARITY_INDEX = 3
const IMAGE_URL_INDEX = 4
const APPROVED_INDEX = 5
const CURRENT_ROTATION_INDEX = 6

const CardFormDialog = ({ updateFunction, rowData, open, setOpen }) => {
  const [playerName, setPlayerName] = useState(
    rowData && rowData[PLAYER_NAME_INDEX]
  )
  const [playerTeam, setPlayerTeam] = useState(
    rowData && rowData[PLAYER_TEAM_INDEX]
  )
  const [cardRarity, setCardRarity] = useState(
    rowData && rowData[CARD_RARITY_INDEX]
  )
  const [imageUrl, setImageUrl] = useState(rowData && rowData[IMAGE_URL_INDEX])
  const [approved, setApproved] = useState(
    rowData && Boolean(rowData[APPROVED_INDEX] == 'true')
  )
  const [currentRotation, setCurrentRotation] = useState(
    rowData && Boolean(rowData[CURRENT_ROTATION_INDEX] == 'true')
  )

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleUpdate = async () => {
    const data = {
      cardId: rowData[CARD_ID_INDEX],
      playerName: playerName,
      playerTeam: playerTeam,
      cardRarity: cardRarity,
      imageUrl: imageUrl,
      approved: approved,
      currentRotation: currentRotation,
    }

    await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${window.location.host}/api/v1/cards/updateCard`,
      data: {
        cardId: rowData[CARD_ID_INDEX],
        playerName: playerName,
        playerTeam: playerTeam,
        cardRarity: cardRarity,
        imageUrl: imageUrl,
        approved: approved,
        currentRotation: currentRotation,
      },
    })

    updateFunction()
    setOpen(false)
  }

  useEffect(() => {
    setPlayerName(rowData && rowData[PLAYER_NAME_INDEX])
    setPlayerTeam(rowData && rowData[PLAYER_TEAM_INDEX])
    setCardRarity(rowData && rowData[CARD_RARITY_INDEX])
    setImageUrl(rowData && rowData[IMAGE_URL_INDEX])
    setApproved(rowData && Boolean(rowData[APPROVED_INDEX] == 'true'))
    setCurrentRotation(
      rowData && Boolean(rowData[CURRENT_ROTATION_INDEX] == 'true')
    )
  }, [open])

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <TextField
          id="name"
          label="Player Name"
          fullWidth
          onChange={(event) => {
            setPlayerName(event.target.value)
          }}
          value={playerName}
        />
        <InputLabel id="playerTeam">Player Team</InputLabel>
        <Select
          id="playerTeam"
          label="Player Team"
          fullWidth
          onChange={(event) => {
            setPlayerTeam(event.target.value)
          }}
          value={playerTeam}
        >
          {TEAMS.map((team) => {
            return (
              <MenuItem
                key={team.CITY_NAME}
                value={`${team.CITY_NAME} ${team.TEAM_NAME}`}
              >
                {team.CITY_NAME} {team.TEAM_NAME}
              </MenuItem>
            )
          })}
        </Select>
        <InputLabel id="playerTeam">Rarity</InputLabel>
        <Select
          id="cardRarity"
          label="Rarity"
          fullWidth
          onChange={(event) => {
            setCardRarity(event.target.value)
          }}
          value={cardRarity}
        >
          {RARITIES.map((rarity) => {
            return (
              <MenuItem key={rarity.label} value={rarity.value}>
                {rarity.value}
              </MenuItem>
            )
          })}
        </Select>
        <TextField
          id="imageUrl"
          label="Image URL"
          fullWidth
          onChange={(event) => {
            setImageUrl(event.target.value)
          }}
          value={imageUrl}
        />
        <FormControlLabel
          labelPlacement="start"
          label="Approved"
          control={
            <Switch
              checked={approved}
              onChange={() => {
                setApproved(!approved)
              }}
              name="approved"
              color="primary"
            />
          }
        />
        <FormControlLabel
          labelPlacement="start"
          label="Current Rotation"
          control={
            <Switch
              checked={currentRotation}
              onChange={() => {
                setCurrentRotation(!currentRotation)
              }}
              name="currentRotation"
              color="primary"
            />
          }
        />
        <img
          width="100%"
          style={{
            marginTop: '2px',
          }}
          src={imageUrl}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpdate} color="primary">
          Update
        </Button>
      </DialogActions>
    </Dialog>
  )
}

const CardEditorPage = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [cards, setCards] = useState([])
  const [open, setOpen] = React.useState(false)
  const [currentRow, setCurrentRow] = useState()

  const columns = [
    '_id',
    'playerName',
    'playerTeam',
    'rarity',
    'imageUrl',
    {
      name: 'approved',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => value.toString(),
      },
    },
    {
      name: 'currentRotation',
      options: {
        filter: false,
        customBodyRender: (value, tableMeta, updateValue) => value.toString(),
      },
    },
  ]

  const options = {
    filterType: 'dropdown',
    download: false,
    print: false,
    selectableRows: 'none',
    onRowClick: (rowData) => {
      setOpen(true)
      setCurrentRow(rowData)
    },
  }

  const fetchCards = async () => {
    const fetchedCards = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${window.location.host}/api/v1/cards/allCards`,
      data: [],
    })

    setCards(fetchedCards.data)
    setIsLoading(false)
  }

  useEffect(() => {
    fetchCards()
  }, [])

  return (
    <>
      <h1>Card Editor Page</h1>
      {isLoading && <div>Loading</div>}
      {!isLoading && (
        <>
          <CardFormDialog
            updateFunction={fetchCards}
            rowData={currentRow}
            open={open}
            setOpen={setOpen}
          />
          <MUIDataTable
            title={'Cards'}
            data={cards}
            columns={columns}
            options={options}
          />
        </>
      )}
    </>
  )
}

export default CardEditorPage

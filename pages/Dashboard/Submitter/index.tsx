import {
  Typography,
  Grid,
  TextField,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Button,
  Box,
} from '@material-ui/core'
import React, { useState } from 'react'
import { RARITIES, TEAMS } from '../../../utils/constants'
import useStyles from './Submitter.styles'
/**
 * The page requires the ability to submit one or more cards with fields for
 *
 * playerName: String
 * playerTeam: String - Can only be one of the current ISFL teams, made an array in utils\constants.ts
 * rarity: String - Can only be one of the current rarities, made an array in utils\constants.ts
 * imageUrl: String
 *
 */

const SubmitterPage = () => {
  const classes = useStyles()

  const [playerName, setPlayerName] = useState('')
  const [currentTeam, setCurrentTeam] = useState('')
  const [cardRarity, setCardRarity] = useState('')
  const [cardImage, setCardImage] = useState('')

  const handleRarityChange = (event) => {
    setCardRarity(event.target.value)
  }
  const handleTeamChange = (event) => {
    setCurrentTeam(event.target.value)
  }

  return (
    <>
      <Box p={2}>
        <h1>Submit Cards</h1>
      </Box>
      <Grid container spacing={0} alignItems={'flex-start'}>
        <Grid container item xs={12} md={6}>
          <Grid item xs={12}>
            <Box p={2}>
              <InputLabel id="playerName">Player Name</InputLabel>
              <TextField
                required
                id="playerName"
                name="playerName"
                fullWidth
                onChange={(e) => {
                  setPlayerName(e.target.value)
                }}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <InputLabel id="playerTeam">Player Team</InputLabel>
              <Select
                labelId="playerTeam"
                id="player-team"
                value={currentTeam}
                onChange={handleTeamChange}
                fullWidth
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
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Box p={2}>
              <InputLabel id="cardRarity">Card Rarity</InputLabel>
              <Select
                labelId="cardRarity"
                id="card-rarity"
                value={cardRarity}
                onChange={handleRarityChange}
                fullWidth
              >
                {RARITIES.map((rarity) => {
                  return (
                    <MenuItem key={rarity} value="rarity">
                      {rarity}
                    </MenuItem>
                  )
                })}
              </Select>
            </Box>
          </Grid>
          <Grid item xs={12} spacing={3}>
            <Box p={2}>
              <InputLabel id="cardImage">Card Image</InputLabel>
              <TextField
                required
                id="cardImage"
                name="cardImage"
                fullWidth
                onBlur={(e) => {
                  setCardImage(e.target.value)
                }}
              />
            </Box>
          </Grid>
        </Grid>
        <Grid container item xs={12} md={6}>
          {cardImage && <img className={classes.cardImage} src={cardImage} />}
        </Grid>
      </Grid>
    </>
  )
}

export default SubmitterPage

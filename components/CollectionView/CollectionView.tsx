import {
  Avatar,
  Box,
  Chip,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants'
import PlayerCard from '../PlayerCard/PlayerCard'
import useStyles from './CollectionView.styles'

const CollectionView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = React.useState(false)
  const [currentCard, setCurrentCard] = useState(null)
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
      })

      const userCards = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/cards/cards`,
        data: { cardIds: user.data.ownedCards },
      })

      setCollectionCards(userCards.data)
    }

    fetchData()
  }, [])

  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()

  const [sortOrder, setSortOrder] = React.useState([
    {
      rarity: 'Backup',
      imageUrl: '/images/bronze-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Starter',
      imageUrl: '/images/silver-icon.svg',
      isEnabled: false,
    },
    { rarity: 'Star', imageUrl: '/images/gold-icon.svg', isEnabled: false },
    { rarity: 'All-Pro', imageUrl: '/images/ruby-icon.svg', isEnabled: false },
    {
      rarity: 'Legend',
      imageUrl: '/images/sapphire-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Specialty',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
  ])

  const ARRAY_OF_RARITIES = ['Backup', 'Starter', 'Star', 'All-Pro', 'Legend']
  const enabledChips = sortOrder.filter((option) => option.isEnabled === true)

  const handleChipClick = (rarityFilter, index) => {
    const rarityFilterCopy = [...sortOrder]
    rarityFilterCopy[index].isEnabled = !rarityFilter.isEnabled
    setSortOrder(rarityFilterCopy)
  }

  const handleClickOpen = (card) => {
    setCurrentCard(card)
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleChange = (event) => {
    setSearchTerm(event.target.value)
  }

  const getFilterResults = (searchTerm, enabledChips) => {
    const enabledChipRarities = enabledChips.map((option) => option.rarity)
    const includesSpecialtyCards = enabledChipRarities.includes('Specialty')
    const onlySpecialtyCards =
      enabledChips.length === 1 && enabledChips[0].rarity === 'Specialty'

    if (!searchTerm && enabledChips.length === 0) {
      return collectionCards
    }

    if (!searchTerm && enabledChips) {
      if (onlySpecialtyCards) {
        return filterBySpecialty(false)
      }
      if (includesSpecialtyCards) {
        return collectionCards.filter(
          (card) =>
            enabledChipRarities.includes(card.rarity) ||
            !ARRAY_OF_RARITIES.includes(card.rarity)
        )
      } else {
        return collectionCards.filter((card) =>
          enabledChipRarities.includes(card.rarity)
        )
      }
    }

    if (searchTerm && !enabledChips) {
      return collectionCards.filter(
        (cards) =>
          cards.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cards.playerTeam.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (searchTerm && enabledChips) {
      if (onlySpecialtyCards) {
        return filterBySpecialty(true)
      }
      if (includesSpecialtyCards) {
        return collectionCards.filter(
          (card) =>
            (card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
              card.playerTeam
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (enabledChipRarities.includes(card.rarity) ||
              !ARRAY_OF_RARITIES.includes(card.rarity))
        )
      }
      return collectionCards.filter(
        (card) =>
          (card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.playerTeam.toLowerCase().includes(searchTerm.toLowerCase())) &&
          enabledChipRarities.includes(card.rarity)
      )
    }
  }

  const filterBySpecialty = (hasSearchTerm) => {
    if (!hasSearchTerm) {
      return collectionCards.filter(
        (card) => !ARRAY_OF_RARITIES.includes(card.rarity)
      )
    }

    if (hasSearchTerm) {
      return collectionCards.filter(
        (card) =>
          (card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.playerTeam.toLowerCase().includes(searchTerm.toLowerCase())) &&
          !ARRAY_OF_RARITIES.includes(card.rarity)
      )
    }
  }

  return (
    <div className={classes.container}>
      <h1>Card Collection</h1>
      <Box
        className={classes.chipList}
        component="div"
        whiteSpace="nowrap"
        overflow={mdUp ? 'auto' : 'scroll'}
      >
        {sortOrder.map((rarityFilter, index) => {
          return (
            <Chip
              key={rarityFilter.rarity}
              className={classes.rarityChip}
              variant={rarityFilter.isEnabled ? 'default' : 'outlined'}
              label={rarityFilter.rarity}
              avatar={<Avatar src={rarityFilter.imageUrl} />}
              onClick={() => handleChipClick(rarityFilter, index)}
            />
          )
        })}
      </Box>
      <Autocomplete
        id="grouped-demo"
        options={collectionCards}
        className={classes.search}
        groupBy={(option) => option.rarity}
        getOptionLabel={(option) => option.playerName}
        renderInput={(params) => (
          <TextField {...params} label="Enter player name" variant="outlined" />
        )}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue)
        }}
      />
      <div></div>

      <Grid className={classes.collectionContainer} container spacing={1}>
        {getFilterResults(searchTerm, enabledChips).map((card) => {
          console.log(card)
          return (
            <PlayerCard
              key={card.rarity + card.playerName}
              card={card}
              currentCard={currentCard}
              handleOpenCard={handleClickOpen}
              handleCloseCard={handleClose}
              open={open}
            />
          )
        })}
      </Grid>
    </div>
  )
}

export default CollectionView

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

const CollectionView = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = React.useState(false)
  const [currentCard, setCurrentCard] = useState(null)
  const [collectionCards, setCollectionCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const apiCallOptions = getUserApiCallOptions()

      const user = await axios({
        method: 'post',
        url: apiCallOptions.url,
        data: apiCallOptions.data,
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

  const getUserApiCallOptions = () => {
    const apiCallOptions =
      props.providerAccountId != null
        ? {
            url: `${API_URL}/api/v1/users/singleUser/providerAccountId`,
            data: {
              providerAccountId: props.providerAccountId,
            },
          }
        : {
            url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
            data: {
              userId: localStorage.getItem('dottsUserId'),
            },
          }
    return apiCallOptions
  }

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
    {
      rarity: 'Star',
      imageUrl: '/images/gold-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'All-Pro',
      imageUrl: '/images/ruby-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Legend',
      imageUrl: '/images/sapphire-icon.svg',
      isEnabled: false,
    },
    // {
    //   rarity: 'Specialty',
    //   imageUrl: '/images/diamond-icon.svg',
    //   isEnabled: false,
    // },
  ])

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

  const getEnabledChipNames = (enabledChips) => {
    let enabledChipNames = []
    for (const enabledChip of enabledChips) {
      enabledChipNames.push(enabledChip.rarity)
    }

    return enabledChipNames
  }

  const getCardsWithSelectedRarities = (cards, selectedRarities) => {
    let cardsWithSelectedRarity = []
    for (const card of cards) {
      if (selectedRarities.includes(card.rarity)) {
        cardsWithSelectedRarity.push(card)
      }
    }

    return cardsWithSelectedRarity
  }

  const getCardsWithMatchingTerms = (cards, searchTerm) => {
    let cardsWithMatchingTerms = []
    for (const card of cards) {
      if (
        card.playerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        card.playerTeam.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        cardsWithMatchingTerms.push(card)
      }
    }

    return cardsWithMatchingTerms
  }

  const getFilterResults = (searchTerm, enabledChips) => {
    const chipsEnabled = enabledChips.length != 0
    const searchTermEnabled = searchTerm != ''
    const enabledChipNames = getEnabledChipNames(enabledChips)
    let cardsToShow = collectionCards

    if (chipsEnabled) {
      cardsToShow = getCardsWithSelectedRarities(cardsToShow, enabledChipNames)
    }

    if (searchTermEnabled) {
      cardsToShow = getCardsWithMatchingTerms(cardsToShow, searchTerm)
    }

    return cardsToShow
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

      <Grid className={classes.collectionContainer} container spacing={1}>
        {getFilterResults(searchTerm, enabledChips).map((card, index) => {
          return (
            <PlayerCard
              key={`${card.rarity}-${card.playerName}-${index}`}
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

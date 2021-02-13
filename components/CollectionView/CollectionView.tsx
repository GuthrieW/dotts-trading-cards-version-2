import {
  Avatar,
  Box,
  Chip,
  Grid,
  TextField,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import { Autocomplete, Pagination } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../utils/constants'
import PlayerCard from '../PlayerCard/PlayerCard'
import useStyles from './CollectionView.styles'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

const CollectionView = (props) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = React.useState(false)
  const [currentCard, setCurrentCard] = useState(null)
  const [collectionCards, setCollectionCards] = useState([])
  const [filteredCards, setFilteredCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const apiCallOptions = getUserApiCallOptions()

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

      let cardIds = props.isflUsername
        ? user.data.ownedCards
        : user.data.account.ownedCards

      const userCards = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/cards/cards`,
        data: { cardIds: cardIds },
      })

      if (userCards.data.error) {
      }

      setCollectionCards(userCards.data)
    }

    fetchData()
  }, [])

  const getUserApiCallOptions = () => {
    console.log('props', props)
    const apiCallOptions =
      props.isflUsername != null
        ? {
            url: `${API_URL}/api/v1/users/singleUser/`,
            data: {
              isflUsername: props.isflUsername,
            },
          }
        : {
            url: `${API_URL}/api/v1/users/currentUser`,
            data: {},
          }

    console.log('apiCallOptions', apiCallOptions)
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
    {
      rarity: 'Award',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Hall of Fame',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Ultimus Champion',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Holograph Expansion',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Autograph Rookie',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Fantasy Kings',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Captain',
      imageUrl: '/images/diamond-icon.svg',
      isEnabled: false,
    },
  ])

  const enabledChips = sortOrder.filter((option) => option.isEnabled === true)

  const handleChipClick = (rarityFilter, index) => {
    setPageNumber(1)
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

  useEffect(() => {
    const getFilterResults = (searchTerm, enabledChips) => {
      const chipsEnabled = enabledChips.length != 0
      const searchTermEnabled = searchTerm != ''
      const enabledChipNames = getEnabledChipNames(enabledChips)
      let cardsToShow = collectionCards

      if (chipsEnabled) {
        cardsToShow = getCardsWithSelectedRarities(
          cardsToShow,
          enabledChipNames
        )
      }

      if (searchTermEnabled) {
        cardsToShow = getCardsWithMatchingTerms(cardsToShow, searchTerm)
      }

      setFilteredCards(cardsToShow)
      return cardsToShow
    }

    getFilterResults(searchTerm, enabledChips)
  }, [searchTerm, sortOrder, collectionCards])

  const [pageNumber, setPageNumber] = useState(1)
  const handlePageChange = (event, value) => {
    setPageNumber(value)
  }
  const numberOfItemsForPage = 12

  return (
    <div className={classes.container}>
      {props.isflUsername && <h1>{`${props.isflUsername}'s Collection`}</h1>}
      {!props.isflUsername && <h1>My Collection</h1>}
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
        clearOnBlur={false}
        renderInput={(params) => (
          <TextField {...params} label="Enter player name" variant="outlined" />
        )}
        onInputChange={(event, newInputValue) => {
          setSearchTerm(newInputValue)
        }}
      />

      <Grid className={classes.collectionContainer} container>
        {filteredCards.length > 0 &&
          filteredCards
            .slice(
              (pageNumber - 1) * numberOfItemsForPage,
              pageNumber * numberOfItemsForPage
            )
            .map((card, index) => {
              return (
                <PlayerCard
                  className={classes.cardContainer}
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
      <Pagination
        count={Math.ceil(filteredCards.length / numberOfItemsForPage)}
        onChange={handlePageChange}
        page={pageNumber}
      />
    </div>
  )
}

export default CollectionView

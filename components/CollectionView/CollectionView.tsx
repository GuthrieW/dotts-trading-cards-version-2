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
import React, { useState } from 'react'
import PlayerCard from '../PlayerCard/PlayerCard'
import useStyles from './CollectionView.styles'

/*
* 
function useCollectionCards() {
  return useQuery('collectionCards', async () => {
    const { data } = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/users/singleUser`,
      data: {
        userId: userId
      }
    })

    return data
  })
}
*/

const mockCards = [
  {
    player_name: 'Darrel Williams',
    player_team: 'Baltimore Hawks',
    rarity: 'Star',
    image_url: 'https://i.imgur.com/pQCWko3.png',
  },
  {
    player_name: 'Quinten Sinclair',
    player_team: 'Baltimore Hawks',
    rarity: 'Star',
    image_url: 'https://i.imgur.com/7WjIvzj.png',
  },
  {
    player_name: 'Tony Gabagool',
    player_team: 'Colorado Yeti',
    rarity: 'Star',
    image_url: 'https://i.imgur.com/rNwmXqB.jpg',
  },
  {
    player_name: 'Ben Stackinpaper',
    player_team: 'Baltimore Hawks',
    rarity: 'Starter',
    image_url: 'https://i.imgur.com/OSSrZkw.png',
  },
  {
    player_name: 'Bruce Buckley',
    player_team: 'Arizona Outlaws',
    rarity: 'Starter',
    image_url: 'https://i.ibb.co/RD4D42N/Bruce-Buckley.png',
  },
  {
    player_name: 'Sardine Bean',
    player_team: 'Baltimore Hawks',
    rarity: 'Backup',
    image_url: 'https://i.imgur.com/ilx8JNQ.png',
  },
  {
    player_name: 'Pete Parker',
    player_team: 'Colorado Yeti',
    rarity: 'All-Pro',
    image_url: 'https://i.imgur.com/NySSiLQ.jpg',
  },
  {
    player_name: 'Forrest Gump',
    player_team: 'New Orleans Second Line',
    rarity: 'Legend',
    image_url: 'https://i.imgur.com/kUbBRFS.png',
  },
  {
    player_name: 'Ian Bavitz',
    player_team: 'Orange County Otters',
    rarity: 'Hall of Fame',
    image_url:
      'https://media.discordapp.net/attachments/721761354846961716/736011625747841084/bavitz.png?width=441&height=618',
  },
]

const CollectionView = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [open, setOpen] = React.useState(false)
  const [currentCard, setCurrentCard] = useState(null)

  const theme = useTheme()
  const mdUp = useMediaQuery(theme.breakpoints.up('md'))
  const classes = useStyles()

  const [sortOrder, setSortOrder] = React.useState([
    {
      rarity: 'Backup',
      image_url: '/images/bronze-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Starter',
      image_url: '/images/silver-icon.svg',
      isEnabled: false,
    },
    { rarity: 'Star', image_url: '/images/gold-icon.svg', isEnabled: false },
    { rarity: 'All-Pro', image_url: '/images/ruby-icon.svg', isEnabled: false },
    {
      rarity: 'Legend',
      image_url: '/images/sapphire-icon.svg',
      isEnabled: false,
    },
    {
      rarity: 'Specialty',
      image_url: '/images/diamond-icon.svg',
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
      return mockCards
    }

    if (!searchTerm && enabledChips) {
      if (onlySpecialtyCards) {
        return filterBySpecialty(false)
      }
      if (includesSpecialtyCards) {
        return mockCards.filter(
          (card) =>
            enabledChipRarities.includes(card.rarity) ||
            !ARRAY_OF_RARITIES.includes(card.rarity)
        )
      } else {
        return mockCards.filter((card) =>
          enabledChipRarities.includes(card.rarity)
        )
      }
    }

    if (searchTerm && !enabledChips) {
      return mockCards.filter(
        (cards) =>
          cards.player_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          cards.player_team.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (searchTerm && enabledChips) {
      if (onlySpecialtyCards) {
        return filterBySpecialty(true)
      }
      if (includesSpecialtyCards) {
        return mockCards.filter(
          (card) =>
            (card.player_name
              .toLowerCase()
              .includes(searchTerm.toLowerCase()) ||
              card.player_team
                .toLowerCase()
                .includes(searchTerm.toLowerCase())) &&
            (enabledChipRarities.includes(card.rarity) ||
              !ARRAY_OF_RARITIES.includes(card.rarity))
        )
      }
      return mockCards.filter(
        (card) =>
          (card.player_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.player_team
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
          enabledChipRarities.includes(card.rarity)
      )
    }
  }

  const filterBySpecialty = (hasSearchTerm) => {
    if (!hasSearchTerm) {
      return mockCards.filter(
        (card) => !ARRAY_OF_RARITIES.includes(card.rarity)
      )
    }

    if (hasSearchTerm) {
      return mockCards.filter(
        (card) =>
          (card.player_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            card.player_team
              .toLowerCase()
              .includes(searchTerm.toLowerCase())) &&
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
              avatar={<Avatar src={rarityFilter.image_url} />}
              onClick={() => handleChipClick(rarityFilter, index)}
            />
          )
        })}
      </Box>
      <Autocomplete
        id="grouped-demo"
        options={mockCards}
        className={classes.search}
        groupBy={(option) => option.rarity}
        getOptionLabel={(option) => option.player_name}
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
          return (
            <PlayerCard
              key={card.rarity + card.player_name}
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

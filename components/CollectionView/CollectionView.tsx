// import {
//   Avatar,
//   Box,
//   Chip,
//   Grid,
//   LinearProgress,
//   TextField,
//   useMediaQuery,
//   useTheme,
// } from '@material-ui/core'
// import { Autocomplete, Pagination } from '@material-ui/lab'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import PlayerCard from '../PlayerCard/PlayerCard'
// import useStyles from './CollectionView.styles'
// import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

// const CollectionView = (props) => {
//   const [searchTerm, setSearchTerm] = useState('')
//   const [open, setOpen] = React.useState(false)
//   const [currentCard, setCurrentCard] = useState(null)
//   const [collectionCards, setCollectionCards] = useState([])
//   const [collectionCardsLoading, setCollectionCardsLoading] = useState(false)
//   const [uniqueCardsForSearch, setUniqueCardsForSearch] = useState([])
//   const [filteredCards, setFilteredCards] = useState([])

//   useEffect(() => {
//     setCollectionCardsLoading(true)
//     const fetchData = async () => {
//       const apiCallOptions = getUserApiCallOptions()

//       const user = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: apiCallOptions.url,
//         data: apiCallOptions.data,
//       })

//       if (user.data.error) {
//       }

//       let cardIds = props.isflUsername
//         ? user.data.ownedCards
//         : user.data.account.ownedCards

//       const userCards = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `/api/v1/cards/cards`,
//         data: { cardIds: cardIds },
//       })

//       if (userCards.data.error) {
//         setCollectionCardsLoading(false)
//       }

//       setCollectionCards(userCards.data.filter(Boolean))
//       const uniqueFilteredCards = new Set()
//       const uniqueCards = userCards.data.filter(Boolean).filter((card) => {
//         if (uniqueFilteredCards.has(card._id)) {
//           return false
//         }
//         uniqueFilteredCards.add(card._id)
//         return true
//       })
//       setUniqueCardsForSearch(uniqueCards)
//       setCollectionCardsLoading(false)
//     }

//     fetchData()
//   }, [])

//   const getUserApiCallOptions = () => {
//     const apiCallOptions =
//       props.isflUsername != null
//         ? {
//             url: `/api/v1/users/singleUser/`,
//             data: {
//               isflUsername: props.isflUsername,
//             },
//           }
//         : {
//             url: `/api/v1/users/currentUser`,
//             data: {},
//           }

//     return apiCallOptions
//   }

//   const theme = useTheme()
//   const mdUp = useMediaQuery(theme.breakpoints.up('md'))
//   const classes = useStyles()

//   const [sortOrder, setSortOrder] = React.useState([
//     {
//       rarity: 'Backup',
//       imageUrl: '/images/bronze-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Starter',
//       imageUrl: '/images/silver-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Star',
//       imageUrl: '/images/gold-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'All-Pro',
//       imageUrl: '/images/ruby-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Legend',
//       imageUrl: '/images/sapphire-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Award',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Hall of Fame',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Ultimus Champion',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Holograph Expansion',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Autograph Rookie',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Fantasy Kings',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Captain',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Unique',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Charity',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//     {
//       rarity: 'Least Valuable Player',
//       imageUrl: '/images/diamond-icon.svg',
//       isEnabled: false,
//     },
//   ])

//   const enabledChips = sortOrder.filter((option) => option.isEnabled === true)

//   const handleChipClick = (rarityFilter, index) => {
//     setPageNumber(1)
//     const rarityFilterCopy = [...sortOrder]
//     rarityFilterCopy[index].isEnabled = !rarityFilter.isEnabled
//     setSortOrder(rarityFilterCopy)
//   }

//   const handleClickOpen = (card) => {
//     setCurrentCard(card)
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   const handleChange = (event) => {
//     setSearchTerm(event.target.value)
//   }

//   const getEnabledChipNames = (enabledChips) => {
//     let enabledChipNames = []
//     for (const enabledChip of enabledChips) {
//       enabledChipNames.push(enabledChip.rarity)
//     }

//     return enabledChipNames
//   }

//   const getCardsWithSelectedRarities = (cards, selectedRarities) => {
//     let cardsWithSelectedRarity = []
//     for (const card of cards) {
//       if (selectedRarities.includes(card.rarity)) {
//         cardsWithSelectedRarity.push(card)
//       }
//     }

//     return cardsWithSelectedRarity
//   }

//   const getCardsWithMatchingTerms = (cards, searchTerm) => {
//     let cardsWithMatchingTerms = []
//     for (const card of cards) {
//       if (
//         (card &&
//           card.playerName.toLowerCase().includes(searchTerm.toLowerCase())) ||
//         (card &&
//           card.playerTeam.toLowerCase().includes(searchTerm.toLowerCase()))
//       ) {
//         cardsWithMatchingTerms.push(card)
//       }
//     }

//     return cardsWithMatchingTerms
//   }

//   useEffect(() => {
//     const getFilterResults = (searchTerm, enabledChips) => {
//       const chipsEnabled = enabledChips.length != 0
//       const searchTermEnabled = searchTerm != ''
//       const enabledChipNames = getEnabledChipNames(enabledChips)
//       let cardsToShow = collectionCards

//       if (chipsEnabled) {
//         cardsToShow = getCardsWithSelectedRarities(
//           cardsToShow,
//           enabledChipNames
//         )
//       }

//       if (searchTermEnabled) {
//         cardsToShow = getCardsWithMatchingTerms(cardsToShow, searchTerm)
//       }

//       const uniqueFilteredCards = new Set()
//       const uniqueCards = cardsToShow.filter((card) => {
//         if (uniqueFilteredCards.has(card._id)) {
//           return false
//         }
//         uniqueFilteredCards.add(card._id)
//         return true
//       })
//       setFilteredCards(uniqueCards)
//       return cardsToShow
//     }

//     getFilterResults(searchTerm, enabledChips)
//   }, [searchTerm, sortOrder, collectionCards])

//   const [pageNumber, setPageNumber] = useState(1)
//   const handlePageChange = (event, value) => {
//     setPageNumber(value)
//   }
//   const numberOfItemsForPage = 12

//   return (
//     <div className={classes.container}>
//       {props.isflUsername && <h1>{`${props.isflUsername}'s Collection`}</h1>}
//       {!props.isflUsername && <h1>My Collection</h1>}
//       <Box
//         className={classes.chipList}
//         component="div"
//         whiteSpace="nowrap"
//         overflow={mdUp ? 'auto' : 'scroll'}
//       >
//         {sortOrder.map((rarityFilter, index) => {
//           return (
//             <Chip
//               key={rarityFilter.rarity}
//               className={classes.rarityChip}
//               variant={rarityFilter.isEnabled ? 'default' : 'outlined'}
//               label={rarityFilter.rarity}
//               avatar={<Avatar src={rarityFilter.imageUrl} />}
//               onClick={() => handleChipClick(rarityFilter, index)}
//             />
//           )
//         })}
//       </Box>
//       <Autocomplete
//         id="grouped-demo"
//         options={uniqueCardsForSearch.sort(
//           (a, b) => -b.rarity.localeCompare(a.rarity)
//         )}
//         className={classes.search}
//         loading={collectionCardsLoading}
//         groupBy={(option) => (option ? option.rarity : '')}
//         getOptionLabel={(option) => (option ? option.playerName : '')}
//         clearOnBlur={false}
//         renderInput={(params) => (
//           <TextField {...params} label="Enter player name" variant="outlined" />
//         )}
//         onInputChange={(event, newInputValue) => {
//           setSearchTerm(newInputValue)
//         }}
//       />

//       {collectionCardsLoading ? (
//         <LinearProgress />
//       ) : (
//         <Grid className={classes.collectionContainer} container>
//           {filteredCards.length > 0 &&
//             filteredCards
//               .slice(
//                 (pageNumber - 1) * numberOfItemsForPage,
//                 pageNumber * numberOfItemsForPage
//               )
//               .map((card, index) => {
//                 const numberOfDuplicates = collectionCards.filter(
//                   (collectionCard) => collectionCard._id === card._id
//                 ).length

//                 return card ? (
//                   <PlayerCard
//                     className={classes.cardContainer}
//                     key={`${card.rarity}-${card.playerName}-${index}`}
//                     card={card}
//                     currentCard={currentCard}
//                     duplicates={
//                       numberOfDuplicates > 1 ? numberOfDuplicates : null
//                     }
//                     handleOpenCard={handleClickOpen}
//                     handleCloseCard={handleClose}
//                     open={open}
//                   />
//                 ) : null
//               })}
//         </Grid>
//       )}
//       <Pagination
//         count={Math.ceil(filteredCards.length / numberOfItemsForPage)}
//         onChange={handlePageChange}
//         page={pageNumber}
//       />
//     </div>
//   )
// }

// export default CollectionView

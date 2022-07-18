// import {
//   Accordion,
//   AccordionDetails,
//   AccordionSummary,
//   Card,
//   LinearProgress,
//   List,
//   ListItem,
//   Typography,
// } from '@material-ui/core'
// import axios from 'axios'
// import React, { useEffect, useState } from 'react'
// import useStyles from '../MyCards.styles'
// import { TEAMS, RARITIES, DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
// import LockIcon from '@material-ui/icons/Lock'
// import LockOpenIcon from '@material-ui/icons/LockOpen'

// const CardsOwned = ({ cards, filterProperty, filterVal }) => {
//   const [total, setTotal] = useState([])
//   const [owned, setOwned] = useState([])
//   const [cardToView, setCardToView] = useState(null)
//   const classes = useStyles()

//   useEffect(() => {
//     setTotal(cards.filter((card) => card[filterProperty] === filterVal))
//   }, [cards])

//   useEffect(() => {
//     setOwned(total.filter((card) => card.owned))
//   }, [total])

//   return (
//     <>
//       {total.length === 0 ? null : (
//         <Accordion style={{ maxWidth: '600px', margin: '0 auto' }}>
//           <AccordionSummary
//             expandIcon={<ExpandMoreIcon />}
//             onClick={() => setCardToView(null)}
//           >
//             {filterVal} - {owned.length}/{total.length}
//           </AccordionSummary>
//           <AccordionDetails>
//             <div style={{ display: 'flex' }}>
//               <List style={{ maxHeight: '200px', overflow: 'scroll' }}>
//                 {total.map((card, index) => {
//                   return (
//                     <ListItem
//                       style={{ display: 'flex' }}
//                       key={index + card.playerName}
//                     >
//                       {card.currentRotation && (
//                         <LockOpenIcon
//                           style={{ fontSize: '12px', paddingRight: '4px' }}
//                         />
//                       )}
//                       {!card.currentRotation && (
//                         <LockIcon
//                           style={{ fontSize: '12px', paddingRight: '4px' }}
//                         />
//                       )}
//                       <span
//                         style={{ color: !card.owned && 'gray' }}
//                         onClick={() => setCardToView(card.imageUrl)}
//                       >
//                         {card.playerName} - {card.rarity}
//                       </span>
//                     </ListItem>
//                   )
//                 })}
//               </List>
//               {cardToView ? (
//                 <img src={cardToView} className={classes.cardDisplay} />
//               ) : (
//                 <Card className={classes.cardDisplay}>
//                   <Typography variant="body2" style={{ padding: '8px' }}>
//                     Select a card to view
//                   </Typography>
//                 </Card>
//               )}
//             </div>
//           </AccordionDetails>
//         </Accordion>
//       )}
//     </>
//   )
// }

// const TrophyRoom = () => {
//   const classes = useStyles()

//   const [responseLoading, setResponseLoading] = useState(false)
//   const [allCards, setAllCards] = useState([])

//   useEffect(() => {
//     setResponseLoading(true)
//     const fetchData = async () => {
//       const user = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `/api/v1/users/currentUser`,
//         data: {},
//       })

//       if (user.data.error) {
//       }

//       let cardIds = user.data.account.ownedCards

//       const userCards = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `/api/v1/cards/cards`,
//         data: {},
//       })

//       const allCards = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `/api/v1/cards/allCards`,
//         data: {},
//       })

//       if (userCards.data.error) {
//         setResponseLoading(false)
//       }

//       const allCardsWithOwnedSet = allCards.data
//         .sort((a, b) => -b.playerName.localeCompare(a.playerName))
//         .map((card) => {
//           if (user.data.account.ownedCards.includes(card._id)) {
//             return {
//               ...card,
//               owned: true,
//             }
//           }

//           return card
//         })

//       setAllCards(allCardsWithOwnedSet)
//       setResponseLoading(false)
//     }

//     fetchData()
//   }, [])

//   return (
//     <div className={classes.container} style={{ paddingBottom: '32px' }}>
//       <div>
//         <h1 style={{ paddingLeft: 12 }}>Trophy Room</h1>
//         <div>
//           <div style={{ paddingRight: 4 }}>
//             <LockOpenIcon style={{ fontSize: 10 }} /> - Currently available in
//             packs
//           </div>
//           <div>
//             <LockIcon style={{ fontSize: 10 }} /> - Not currently available in
//             packs
//           </div>
//         </div>
//       </div>

//       {!responseLoading && (
//         <>
//           {TEAMS.map((team, index) => {
//             return (
//               <div key={index}>
//                 {allCards && (
//                   <CardsOwned
//                     filterVal={`${team.CITY_NAME} ${team.TEAM_NAME}`}
//                     filterProperty="playerTeam"
//                     cards={allCards}
//                   />
//                 )}
//               </div>
//             )
//           })}
//           {/* This isn't ideal, but we dont have a great way to
//               say "this set has never been in rotation" */}
//           {RARITIES.filter((rarity) => {
//             if (
//               rarity.value === 'Anniversary First Team' ||
//               rarity.value === 'Anniversary Second Team'
//             ) {
//               return false
//             }

//             return true
//           }).map((rarity, index) => {
//             return (
//               <div key={index}>
//                 {allCards && (
//                   <CardsOwned
//                     filterVal={`${rarity.value}`}
//                     filterProperty="rarity"
//                     cards={allCards}
//                   />
//                 )}
//               </div>
//             )
//           })}
//         </>
//       )}
//       {responseLoading && <LinearProgress />}
//     </div>
//   )
// }

// export default TrophyRoom

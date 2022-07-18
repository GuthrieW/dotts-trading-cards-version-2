// import React, { useEffect, useState } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
// import {
//   Grid,
//   List,
//   Card,
//   CardHeader,
//   ListItem,
//   ListItemText,
//   ListItemIcon,
//   Checkbox,
//   Button,
//   Divider,
// } from '@material-ui/core'
// import axios from 'axios'
// import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
// import ActionButton from '../../../components/ActionButton/ActionButton'
// import { Packs } from '../../../utils/packs'
// import Router from 'next/router'

// const useStyles = makeStyles((theme) => ({
//   root: {
//     marginTop: 32,
//     marginLeft: 0,
//     marginRight: 0,
//     marginBottom: 100,
//     [theme.breakpoints.down('md')]: {
//       display: 'flex',
//       flexDirection: 'column',
//     },
//   },
//   cardHeader: {
//     padding: theme.spacing(1, 2),
//   },
//   middleButtons: {
//     margin: 24,
//   },
//   list: {
//     width: 250,
//     height: 400,
//     backgroundColor: theme.palette.background.paper,
//     overflow: 'auto',
//   },
//   button: {
//     margin: theme.spacing(0.5, 0),
//   },
// }))

// function not(a, b) {
//   return a.filter((value) => b.indexOf(value) === -1)
// }

// function intersection(a, b) {
//   return a.filter((value) => b.indexOf(value) !== -1)
// }

// function union(a, b) {
//   return [...a, ...not(b, a)]
// }

// export default function TransferList() {
//   const classes = useStyles()
//   const [checked, setChecked] = React.useState([])
//   const [left, setLeft] = React.useState([])
//   const [right, setRight] = React.useState([])
//   const [isLoading, setIsLoading] = useState(true)

//   useEffect(() => {
//     const fetchSubscribedUsers = async () => {
//       const fetchedUsers = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `/api/v1/users/unsubscribedUsers`,
//         data: [],
//       })

//       setLeft(
//         fetchedUsers.data.sort((a, b) =>
//           a.isflUsername > b.isflUsername ? 1 : -1
//         )
//       )
//       setIsLoading(false)
//     }

//     fetchSubscribedUsers()
//   }, [])

//   const leftChecked = intersection(checked, left)
//   const rightChecked = intersection(checked, right)

//   const handleToggle = (value) => () => {
//     const currentIndex = checked.indexOf(value)
//     const newChecked = [...checked]

//     if (currentIndex === -1) {
//       newChecked.push(value)
//     } else {
//       newChecked.splice(currentIndex, 1)
//     }

//     setChecked(newChecked)
//   }

//   const numberOfChecked = (items) => intersection(checked, items).length

//   const handleToggleAll = (items) => () => {
//     if (numberOfChecked(items) === items.length) {
//       setChecked(not(checked, items))
//     } else {
//       setChecked(union(checked, items))
//     }
//   }

//   const handleCheckedRight = () => {
//     setRight(right.concat(leftChecked))
//     setLeft(not(left, leftChecked))
//     setChecked(not(checked, leftChecked))
//   }

//   const handleCheckedLeft = () => {
//     setLeft(left.concat(rightChecked))
//     setRight(not(right, rightChecked))
//     setChecked(not(checked, rightChecked))
//   }

//   const handleOnClick = async (packType) => {
//     const result = await axios({
//       headers: {
//         Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//       },
//       method: 'post',
//       url: `/api/v1/users/addPackToUsers`,
//       data: {
//         packType: packType,
//         selectedUsers: checked,
//       },
//     })

//     if (result.data.error) {
//       console.log(result.data.error)
//     } else {
//       Router.reload()
//     }
//   }

//   const customList = (title, items) => (
//     <Card>
//       <CardHeader
//         className={classes.cardHeader}
//         avatar={
//           <Checkbox
//             onClick={handleToggleAll(items)}
//             checked={
//               numberOfChecked(items) === items.length && items.length !== 0
//             }
//             indeterminate={
//               numberOfChecked(items) !== items.length &&
//               numberOfChecked(items) !== 0
//             }
//             disabled={items.length === 0}
//             inputProps={{ 'aria-label': 'all items selected' }}
//           />
//         }
//         title={title}
//         subheader={`${numberOfChecked(items)}/${items.length} selected`}
//       />
//       <Divider />
//       <List className={classes.list} dense component="div" role="list">
//         {items.map((value) => {
//           const labelId = `transfer-list-all-item-${value}-label`

//           return (
//             <ListItem
//               key={value._id}
//               role="listitem"
//               button
//               onClick={handleToggle(value)}
//             >
//               <ListItemIcon>
//                 <Checkbox
//                   checked={checked.indexOf(value) !== -1}
//                   tabIndex={-1}
//                   disableRipple
//                   inputProps={{ 'aria-labelledby': labelId }}
//                 />
//               </ListItemIcon>
//               <ListItemText
//                 id={value.isflUsername}
//                 primary={`${value.isflUsername}`}
//               />
//             </ListItem>
//           )
//         })}
//         <ListItem />
//       </List>
//     </Card>
//   )

//   return (
//     <Grid
//       container
//       justify="center"
//       alignItems="center"
//       className={classes.root}
//     >
//       {isLoading && <h1>Loading...</h1>}
//       {!isLoading && (
//         <>
//           <Grid item>{customList('Choices', left)}</Grid>
//           <Grid item className={classes.middleButtons}>
//             <Grid container direction="column" alignItems="center">
//               <Button
//                 variant="outlined"
//                 size="small"
//                 className={classes.button}
//                 onClick={handleCheckedRight}
//                 disabled={leftChecked.length === 0}
//                 aria-label="move selected right"
//               >
//                 &gt;
//               </Button>
//               <Button
//                 variant="outlined"
//                 size="small"
//                 className={classes.button}
//                 onClick={handleCheckedLeft}
//                 disabled={rightChecked.length === 0}
//                 aria-label="move selected left"
//               >
//                 &lt;
//               </Button>
//             </Grid>
//           </Grid>
//           <Grid item>{customList('Chosen', right)}</Grid>
//         </>
//       )}
//       {rightChecked.length > 0 && (
//         // <ActionButton
//         //   onClick={() => handleOnClick(Packs.Type.Regular)}
//         //   label={`Issue ${checked.length} Regular Pack(s)`}
//         // />
//         <ActionButton
//           onClick={() => handleOnClick(Packs.Type.Ultimus)}
//           label={`Issue ${checked.length} Ultimus Pack(s)`}
//         />
//       )}
//     </Grid>
//   )
// }

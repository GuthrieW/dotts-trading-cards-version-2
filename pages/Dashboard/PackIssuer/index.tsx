import {
  AppBar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  Button,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
} from '@material-ui/core'
import { TabPanel } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ActionButton from '../../../components/ActionButton/ActionButton'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import UnsubscribedUsers from './UnsubscribedUsers'

/**
 * This needs a search bar for searching for a user and updating the number of packs a user has.
 *
 * This also needs to display all users that have the boolean isSubscribed set to true and a button
 * that when clicked will add one pack to each of those users.
 */

const SubscribedUsers = () => {
  const [subscribedUsers, setSubscribedUsers] = useState([])

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      const fetchedUsers = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/subscribedUsers`,
        data: [],
      })
      console.log(fetchedUsers)

      setSubscribedUsers(fetchedUsers.data)
    }

    fetchSubscribedUsers()
  }, [])

  if (subscribedUsers && subscribedUsers.length > 0) {
    return (
      <>
        <List>
          {subscribedUsers.map((user) => {
            return (
              <ListItem key={user._id}>
                <ListItemText>{user.isflUsername}</ListItemText>
              </ListItem>
            )
          })}
        </List>
        <ActionButton label="Issue Packs" />
      </>
    )
  }

  return <div>Loading...</div>
}

// const UnsubscribedUsers = () => {
//   const [unsubscribedUsers, setUnsubscribedUsers] = useState([]);
//   const [selected, setSelected] = React.useState([]);
//   const [userFilter, setUserFilter] = useState('');

//   useEffect(() => {
//     const fetchSubscribedUsers = async () => {

//       const fetchedUsers = await axios({
//         headers: {
//           Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
//         },
//         method: 'post',
//         url: `${API_URL}/api/v1/users/unsubscribedUsers`,
//         data: [],
//       })
//       console.log(fetchedUsers)

//       setUnsubscribedUsers(fetchedUsers.data)
//     }

//     fetchSubscribedUsers()
//   }, [])

//   const handleRowClick = (event, name) => {
//     console.log(name)
//     const selectedIndex = selected.indexOf(name);
//     let newSelected = [];

//     if (selectedIndex === -1) {
//       newSelected = newSelected.concat(selected, name);
//     } else if (selectedIndex === 0) {
//       newSelected = newSelected.concat(selected.slice(1));
//     } else if (selectedIndex === selected.length - 1) {
//       newSelected = newSelected.concat(selected.slice(0, -1));
//     } else if (selectedIndex > 0) {
//       newSelected = newSelected.concat(
//         selected.slice(0, selectedIndex),
//         selected.slice(selectedIndex + 1),
//       );
//     }

//     setSelected(newSelected);
//   };

//   const isSelected = (name) => selected.indexOf(name) !== -1;

//   const handleSearch = (e) => {
//     setUserFilter(e.target.value);

//   }
//   if (unsubscribedUsers && unsubscribedUsers.length > 0) {
//     return (
//       <>
//         <TextField id="outlined-basic" label="Enter ISFL username" variant="outlined" onBlur={handleSearch} />
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell width="50%">Name</TableCell>
//               <TableCell width="50%">Issue Pack?</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {unsubscribedUsers
//               .filter((user) => {
//                 if (userFilter) {
//                   return user.isflUsername.startsWith(userFilter)
//                 }

//                 return true;
//               })
//               .map(user => {
//                 const isItemSelected = isSelected(user._id);

//                 return (
//                   <TableRow
//                     hover
//                     role="checkbox"
//                     aria-checked={isItemSelected}
//                     tabIndex={-1}
//                     key={user._id}
//                     selected={isItemSelected}
//                   >
//                     <TableCell width="60%">{user.isflUsername}</TableCell>
//                     <TableCell padding="checkbox" align="right" onClick={(event) => handleRowClick(event, user._id)}
//                     >
//                       <Checkbox
//                         checked={isItemSelected}
//                       />
//                     </TableCell>
//                   </TableRow>
//                 )
//               })}
//           </TableBody>
//         </Table>
//         <ActionButton label={`Issue ${selected.length} Packs`} />
//       </>
//     )
//   };

//   return <div>Loading...</div>;
// }

const PackIssuerPage = () => {
  const [value, setValue] = useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div>
      <AppBar position="static" color="transparent">
        <Tabs
          value={value}
          onChange={handleChange}
          color="secondary"
          variant="fullWidth"
          centered
        >
          <Tab label="Subscribers" value={0} />
          <Tab label="Non-subscribers" value={1} />
        </Tabs>
      </AppBar>
      {value === 0 && <SubscribedUsers />}
      {value === 1 && <UnsubscribedUsers />}
    </div>
  )
}

export default PackIssuerPage

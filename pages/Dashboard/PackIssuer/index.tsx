import { AppBar, Tabs, Tab, List, ListItem, ListItemText } from '@material-ui/core';
import { TabPanel } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import ActionButton from '../../../components/ActionButton/ActionButton';
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants';

/**
 * This needs a search bar for searching for a user and updating the number of packs a user has.
 *
 * This also needs to display all users that have the boolean isSubscribed set to true and a button
 * that when clicked will add one pack to each of those users.
 */

const SubscribedUsers = ({ users }) => {
  console.log(users)
  if (users && users.length > 0) {
    return (
      <>
        <List>
          {users.map((user) => {
            return (<ListItem>
              <ListItemText>{user.isflUsername}</ListItemText>
            </ListItem>)
          }
          )}
        </List>
        <ActionButton label="Issue Packs" />
      </>
    )
  };

  return <div>Loading...</div>;
}

const PackIssuerPage = () => {
  const [value, setValue] = useState(0);
  const [subscribedUsers, setSubscribedUsers] = useState([]);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  return (<div>
    <AppBar position="static" color="transparent">
      <Tabs value={value} onChange={handleChange} color="secondary" variant="fullWidth" centered>
        <Tab label="Subscribers" value={0} />
        <Tab label="Non-subscribers" value={1} />
      </Tabs>
    </AppBar>
    {value === 0 && <SubscribedUsers users={subscribedUsers} />}
    {value === 1 && <div>non-subscriber view</div>}
  </div>)
}

export default PackIssuerPage

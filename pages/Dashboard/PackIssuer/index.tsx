import {
  AppBar,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import ActionButton from '../../../components/ActionButton/ActionButton'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import UnsubscribedUsers from './UnsubscribedUsers'
import Router from 'next/router'
import { Packs } from '../../../utils/packs'

/**
 * This needs a search bar for searching for a user and updating the number of packs a user has.
 *
 * This also needs to display all users that have the boolean isSubscribed set to true and a button
 * that when clicked will add one pack to each of those users.
 */

const SubscribedUsers = () => {
  const [subscribedUsers, setSubscribedUsers] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchSubscribedUsers = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/currentUser`,
        data: {},
      })

      if (user.data.error) {
      }

      const account = user.data.account
      if (!account.isAdmin && !account.isPackIssuer) {
        Router.push({
          pathname: '/OpenPacks',
        })
      }

      const fetchedUsers = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/subscribedUsers`,
        data: [],
      })

      setSubscribedUsers(fetchedUsers.data)
      setIsLoading(false)
    }

    fetchSubscribedUsers()
  }, [])

  const handleOnClick = async (packType) => {
    const result = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${API_URL}/api/v1/users/addPackToSubscribedUsers`,
      data: {
        packType: packType,
      },
    })

    if (result.data.error) {
      console.log(result.data.error)
    } else {
      Router.reload()
    }
  }

  if (!subscribedUsers || isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
  }

  if (subscribedUsers) {
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
        <ActionButton
          onClick={() => handleOnClick(Packs.Type.Regular)}
          label="Issue Regular Packs"
        />
        {/* <ActionButton
          onClick={() => handleOnClick(Packs.Type.Ultimus)}
          label="Issue Ultimus Packs"
        /> */}
      </>
    )
  }
}

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

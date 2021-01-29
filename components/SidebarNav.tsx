import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import Divider from '@material-ui/core/Divider'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MyCardsIcon from '../public/icons/MyCardsIcon'
import OpenPacksIcon from '../public/icons/OpenPacksIcon'
import CommunityIcon from '../public/icons/CommunityIcon'
import AdminIcon from '../public/icons/AdminIcon'
import { Box, MenuItem } from '@material-ui/core'
import { signOut } from 'next-auth/client'
import Link from 'next/link'
import { API_URL } from '../utils/constants'
import axios from 'axios'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: {
    width: 100,
    alignSelf: 'center',
    ...theme.mixins.toolbar,
  },
}))

function PermanentDrawerLeft({ value, updateTabValue, sessionValue }) {
  const classes = useStyles()
  const [seeAdminPage, setSeeAdminPage] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
      })

      setSeeAdminPage(
        user.data.isAdmin ||
          user.data.isProcessor ||
          user.data.isSubmitter ||
          user.data.isPackIssuer
      )
    }

    fetchData()
  }, [])

  return (
    <>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <img className={classes.toolbar} src="/images/Dotts-Logo-White.png" />
        <Divider />
        {sessionValue && (
          <Box p={2}>
            Signed in as {sessionValue.user.email} <br />
            <button onClick={signOut}>Sign out</button>
          </Box>
        )}
        <Divider />
        <List>
          <Link href="/MyCards">
            <MenuItem
              onClick={() => updateTabValue(0)}
              selected={value === 0}
              button
            >
              <ListItemIcon>
                <MyCardsIcon />
              </ListItemIcon>
              <ListItemText primary={'My Cards'} />
            </MenuItem>
          </Link>
          <Link href="/OpenPacks">
            <MenuItem
              onClick={() => updateTabValue(1)}
              selected={value === 1}
              button
            >
              <ListItemIcon>
                <OpenPacksIcon />
              </ListItemIcon>
              <ListItemText primary={'Open Packs'} />
            </MenuItem>
          </Link>
          <Link href="/Community">
            <MenuItem
              onClick={() => updateTabValue(2)}
              selected={value === 2}
              button
            >
              <ListItemIcon>
                <CommunityIcon />
              </ListItemIcon>
              <ListItemText primary={'Community'} />
            </MenuItem>
          </Link>
          {seeAdminPage && (
            <Link href="/Admin">
              <MenuItem
                onClick={() => updateTabValue(3)}
                selected={value === 3}
                button
              >
                <ListItemIcon>
                  <AdminIcon />
                </ListItemIcon>
                <ListItemText primary={'Admin'} />
              </MenuItem>
            </Link>
          )}
        </List>
      </Drawer>
    </>
  )
}

export default PermanentDrawerLeft

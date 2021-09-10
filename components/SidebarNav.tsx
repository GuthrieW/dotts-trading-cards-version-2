import React, { useState, useEffect } from 'react'
import {
  Drawer,
  List,
  Divider,
  ListItemIcon,
  ListItemText,
  Box,
  MenuItem,
  makeStyles,
  Button,
} from '@material-ui/core'
import MyCardsIcon from '../public/icons/MyCardsIcon'
import OpenPacksIcon from '../public/icons/OpenPacksIcon'
import CommunityIcon from '../public/icons/CommunityIcon'
import { DOTTS_ACCESS_TOKEN } from '../utils/constants'
import axios from 'axios'
import Link from 'next/link'
import Router from 'next/router'
import TradingIcon from '../public/icons/TradingIcon'

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
  sidebarLogo: {
    cursor: 'pointer',
    width: 100,
    alignSelf: 'center',
    ...theme.mixins.toolbar,
  },
}))

const signOut = () => {
  localStorage.removeItem(DOTTS_ACCESS_TOKEN)
  Router.push({
    pathname: `/Authentication/LogIn`,
  })
}

function PermanentDrawerLeft({ value, updateTabValue, currentUser }) {
  const classes = useStyles()

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
        <Link href="/">
          <img
            className={classes.sidebarLogo}
            src="/images/Dotts-Logo-White.png"
          />
        </Link>
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
          {currentUser && currentUser.isTradingBetaUser && (
            <Link href="/Trading">
              <MenuItem
                onClick={() => updateTabValue(3)}
                selected={value === 4}
                button
              >
                <ListItemIcon>
                  <TradingIcon />
                </ListItemIcon>
                <ListItemText primary={'Trading'} />
              </MenuItem>
            </Link>
          )}
        </List>
      </Drawer>
    </>
  )
}

export default PermanentDrawerLeft

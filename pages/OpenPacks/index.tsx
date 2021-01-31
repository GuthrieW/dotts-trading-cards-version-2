import {
  Badge,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import OpenPacksIcon from '../../public/icons/OpenPacksIcon'
import useStyles from './OpenPacks.styles'
import { PACK_TYPES } from '../../utils/packs'
import { API_URL } from '../../utils/constants'
import axios from 'axios'
import Router from 'next/router'
import PackViewerIntermediate from './PackViewerIntermediate'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

function OpenPacksPage() {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null)
  const [isRedirect, setIsRedirect] = useState(false)
  const [packType, setPackType] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/currentUser/`,
        data: {},
      })

      setCurrentUser(user.data)
    }

    fetchData()
  }, [])

  const getNumberOfPacks = (packType) => {
    if (currentUser) {
      if (packType === 'regular') {
        return currentUser.ownedRegularPacks
      } else if (packType === 'ultimus') {
        return currentUser.ownedUltimusPacks
      }
    }

    return 0
  }

  const handleOnClick = async (packType) => {
    setPackType(packType)
    setIsRedirect(true)
    return
  }

  return (
    <>
      {isRedirect && <PackViewerIntermediate packType={packType} />}
      <h1>Open Packs</h1>
      <GridList
        className={classes.packsGrid}
        spacing={16}
        cellHeight={smUp ? 375 : 400}
        cols={smUp ? 2 : 1}
      >
        {PACK_TYPES.map((pack) => {
          const { type, name, imageUrl } = pack
          return (
            <GridListTile className={classes.cardContainer} key={name}>
              <div className={classes.linkContainer}>
                <img
                  onClick={() => handleOnClick(type)}
                  className={classes.packImage}
                  src={imageUrl}
                />
                <GridListTileBar
                  title={`Open ${name}`}
                  actionIcon={
                    <IconButton aria-label={`info about ${name}`}>
                      <Badge
                        max={999}
                        color="secondary"
                        badgeContent={getNumberOfPacks(type)}
                      >
                        <OpenPacksIcon />
                      </Badge>
                    </IconButton>
                  }
                />
              </div>
            </GridListTile>
          )
        })}
      </GridList>
    </>
  )
}

export default OpenPacksPage

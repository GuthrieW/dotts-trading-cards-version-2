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

function OpenPacksPage() {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/users/singleUser/dottsUserId`,
        data: {
          userId: localStorage.getItem('dottsUserId'),
        },
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
    Router.push({
      pathname: `/OpenPacks/PackViewerIntermediate/`,
      query: {
        packType: packType,
      },
    })
  }

  return (
    <>
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
              {/* <Link href={`/OpenPacks/PackViewer/${type}`}> */}
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

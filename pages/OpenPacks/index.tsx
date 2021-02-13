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
import PackViewerIntermediate from './PackViewerIntermediate'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'

function OpenPacksPage() {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null)
  const [isRedirect, setIsRedirect] = useState(false)
  const [packType, setPackType] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [availablePacksForUser, setAvailablePacksForUser] = useState({ regular: 0, ultimus: 0 });

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

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)
      setAvailablePacksForUser({
        regular: user.data.account.ownedRegularPacks,
        ultimus: user.data.account.ownedUltimusPacks
      })
      setIsLoading(false)
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
      {isLoading && <h1>Loading...</h1>}
      {isRedirect && <PackViewerIntermediate packType={packType} />}
      <h1>Open Packs</h1>
      <GridList
        className={classes.packsGrid}
        spacing={16}
        cellHeight={smUp ? 375 : 400}
        cols={smUp ? 2 : 1}
      >
        {Object.entries(availablePacksForUser).map((packType) => {
          const packName = packType[0];
          const packNumber = packType[1];
          const packInfo = PACK_TYPES.find((pack) => pack.type === packName)
          const { type, name, imageUrl } = packInfo;
          return (
            packNumber > 0 ?
              <GridListTile className={classes.cardContainer} key={name} onClick={() => handleOnClick(type)}>
                <div className={classes.linkContainer}>
                  <img
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
              : null
          )
        })}
      </GridList>
    </>
  )
}

export default OpenPacksPage

import {
  Badge,
  Button,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@material-ui/core'
import Link from 'next/link'
import React from 'react'
import OpenPacksIcon from '../../public/icons/OpenPacksIcon'
import useStyles from './OpenPacks.styles'
import { PACK_TYPES } from '../../utils/packs'

/*
Should use PACK_TYPES for the pack information and then query the user to get the number of packs that they have

function useCurrentUserAccount(userId) {
  return useQuery('collection', async () => {
    const { data } = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/users/singleUser`,
      data: {
        userId: userId,
      },
    })

    return data
  })
}
*/

const mockPacks = [
  {
    pack_name: 'Base Set Pack',
    image_url:
      'https://cdn.discordapp.com/attachments/719410556578299954/773048548026875904/s25_Pack.png',
    number_of_packs: 4,
    pack_type: 'base',
  },
  {
    pack_name: 'Ultimus Pack',
    image_url:
      'https://cdn.discordapp.com/attachments/719410556578299954/776782018352119818/uw_pack.png',
    number_of_packs: 1,
    pack_type: 'ultimus',
  },
  {
    pack_name: 'Fake Pack',
    image_url:
      'https://cdn.discordapp.com/attachments/719410556578299954/776782018352119818/uw_pack.png',
    number_of_packs: 1,
    pack_type: 'fake',
  },
]

function OpenPacksPage() {
  const theme = useTheme()
  const smUp = useMediaQuery(theme.breakpoints.up('sm'))
  const classes = useStyles()

  return (
    <>
      <h1>Open Packs</h1>
      <GridList
        className={classes.packsGrid}
        spacing={16}
        cellHeight={smUp ? 375 : 400}
        cols={smUp ? 2 : 1}
      >
        {mockPacks.map((pack) => {
          const { pack_type } = pack
          return (
            <GridListTile
              className={classes.cardContainer}
              key={pack.pack_name}
            >
              <Link href={`/OpenPacks/PackViewer/${pack_type}`}>
                <div className={classes.linkContainer}>
                  <img className={classes.packImage} src={pack.image_url} />
                  <GridListTileBar
                    title={`Open ${pack.pack_name}`}
                    actionIcon={
                      <IconButton aria-label={`info about ${pack.pack_name}`}>
                        <Badge
                          color="secondary"
                          badgeContent={pack.number_of_packs}
                        >
                          <OpenPacksIcon />
                        </Badge>
                      </IconButton>
                    }
                  />
                </div>
              </Link>
            </GridListTile>
          )
        })}
      </GridList>
    </>
  )
}

export default OpenPacksPage

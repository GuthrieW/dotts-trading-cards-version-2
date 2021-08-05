import {
  Box,
  Card,
  CardActionArea,
  Chip,
  Divider,
  Grid,
  Typography,
} from '@material-ui/core'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import { formatDistance, parseISO, subDays } from 'date-fns'
import ActionButton from '../../components/ActionButton/ActionButton'

const getChipColor = (tradeStatus) => {
  switch (tradeStatus) {
    case 'pending':
      return 'primary'
    case 'declined':
      return 'secondary'
    default:
      return 'default'
  }
}

const MyCards = () => {
  const [userTrades, setUserTrades] = useState([])
  const [currentUser, setCurrentUser] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/currentUser`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account._id)

      const userTrades = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/trades/tradesByUser`,
        data: { userId: user.data.account._id },
      })

      console.log({ userTrades })

      setUserTrades(userTrades.data)
    }

    fetchData()
  }, [])

  console.log({ currentUser })
  return (
    <Box mb={20} pl={2} pr={2}>
      <h1>My Trades</h1>
      {userTrades &&
        userTrades.length > 0 &&
        userTrades.map((trade, index) => {
          const {
            offeringUserId,
            receivingUserId,
            offeringUserInfo,
            receivingUserInfo,
            offeringUserCardIds,
            receivingUserCardIds,
            tradeStatus,
            tradeOfferDate,
          } = trade
          const isUserTrade = offeringUserId === currentUser
          return (
            <>
              <Box key={index}>
                <Card key={index}>
                  <Link
                    href={`/Trading/MyTrades/${encodeURIComponent(trade._id)}`}
                  >
                    <CardActionArea>
                      <Box p={2} mb={2}>
                        <Grid
                          container
                          alignItems="flex-start"
                          direction="column"
                        >
                          <Grid
                            container
                            direction="row"
                            alignItems="center"
                            justifyContent="space-between"
                          >
                            <Typography variant="h4" component="h2">
                              {isUserTrade ? 'Outgoing' : 'Incoming'}
                            </Typography>
                            <Chip
                              // size="small"
                              label={tradeStatus}
                              color={getChipColor(tradeStatus)}
                            />
                          </Grid>
                          <Grid item>
                            <Typography
                              color="textSecondary"
                              variant="subtitle2"
                              component="h6"
                            >
                              Trade with{' '}
                              {isUserTrade
                                ? receivingUserInfo.length > 0 &&
                                  receivingUserInfo[0].isflUsername
                                : offeringUserInfo.length > 0 &&
                                  offeringUserInfo[0].isflUsername}{' '}
                              -{' '}
                              {formatDistance(
                                subDays(parseISO(tradeOfferDate), 0),
                                new Date(),
                                {
                                  addSuffix: true,
                                }
                              )}
                            </Typography>
                          </Grid>
                        </Grid>
                      </Box>
                      <Divider />
                      <Box p={2} mt={2}>
                        <Grid container spacing={2}>
                          <Grid item spacing={2}>
                            <Typography variant="h5" component="h3">
                              {isUserTrade ? 'Your' : 'Their'} Offer:{' '}
                            </Typography>
                            {offeringUserCardIds.map((card) => (
                              <div>
                                {card.playerName} ({card.rarity}){' '}
                              </div>
                            ))}
                          </Grid>
                          <Grid item spacing={2}>
                            <Typography variant="h5" component="h3">
                              {isUserTrade ? 'Your' : 'Their'} Request:{' '}
                            </Typography>
                            {receivingUserCardIds.map((card) => (
                              <div>
                                {card.playerName} ({card.rarity})
                              </div>
                            ))}
                          </Grid>
                        </Grid>
                      </Box>
                    </CardActionArea>
                  </Link>
                </Card>
              </Box>
              <ActionButton
                onClick={(e) => {
                  e.preventDefault()
                  router.push('/Trading/NewTrade')
                }}
                label={'Create New Trade'}
              />
              <br />
            </>
          )
        })}
    </Box>
  )
}

export default MyCards

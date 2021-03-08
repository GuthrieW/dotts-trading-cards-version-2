import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/database'
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import { getAccessTokenFromHeader } from '../../../common'
import JsonWebToken from 'jsonwebtoken'
import {
  BACKUP,
  STARTER,
  STAR,
  ALL_PRO,
  LEGEND,
  AWARD,
  HALL_OF_FAME,
  ULTIMUS_CHAMPION,
  HOLOGRAPH_EXPANSION,
  AUTOGRAPH_ROOKIE,
  FANTASY_KINGS,
  CAPTAIN,
  TEAM_LOGO,
} from '../../../../../../utils/constants'
import { REGULAR_CHANCES } from '../constants'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response
      .status(200)
      .json({ error: 'User not authenticated', pulledCards: [] })
    return
  }

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    const { database, client } = await connect()
    const account = await database.collection('dotts_accounts').findOne({
      email: email,
    })

    if (account.ownedRegularPacks < 1) {
      response.status(200).json({
        pulledCards: [],
      })
      return
    }

    let cardChances = []
    let pulledCardIds = []
    let pulledCards = []
    let allWorseThanGold = true

    for (let i = 0; i < 6; i++) {
      cardChances.push(Math.floor(Math.random() * 10000) + 1)
      if (cardChances[i] > 7824) {
        allWorseThanGold = false
      }
    }

    if (allWorseThanGold) {
      cardChances[0] = 7825
    }

    let cardRarity
    for (const chance of cardChances) {
      if (chance > 0 && chance <= REGULAR_CHANCES.BACKUP) {
        cardRarity = BACKUP
      } else if (
        chance > REGULAR_CHANCES.BACKUP &&
        chance <= REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER
      ) {
        cardRarity = STARTER
      } else if (
        chance > REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR
      ) {
        cardRarity = STAR
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO
      ) {
        cardRarity = ALL_PRO
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND
      ) {
        cardRarity = LEGEND
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD
      ) {
        cardRarity = AWARD
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME
      ) {
        cardRarity = HALL_OF_FAME
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION
      ) {
        cardRarity = ULTIMUS_CHAMPION
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION
      ) {
        cardRarity = HOLOGRAPH_EXPANSION
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION +
            REGULAR_CHANCES.AUTOGRAPH_ROOKIE
      ) {
        cardRarity = AUTOGRAPH_ROOKIE
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION +
            REGULAR_CHANCES.AUTOGRAPH_ROOKIE &&
        chance <=
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION +
            REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
            REGULAR_CHANCES.FANTASY_KINGS
      ) {
        cardRarity = FANTASY_KINGS
      } else if (
        chance >
          REGULAR_CHANCES.BACKUP +
            REGULAR_CHANCES.STARTER +
            REGULAR_CHANCES.STAR +
            REGULAR_CHANCES.ALL_PRO +
            REGULAR_CHANCES.LEGEND +
            REGULAR_CHANCES.AWARD +
            REGULAR_CHANCES.HALL_OF_FAME +
            REGULAR_CHANCES.ULTIMUS_CHAMPION +
            REGULAR_CHANCES.HOLOGRAPH_EXPANSION +
            REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
            REGULAR_CHANCES.FANTASY_KINGS &&
        chance <= 10000
      ) {
        cardRarity = CAPTAIN
      } else {
        cardRarity = BACKUP
      }

      const pulledCard = await database
        .collection('dotts_cards')
        .aggregate([
          {
            $match: {
              approved: { $ne: false },
              currentRotation: { $ne: false },
              rarity: cardRarity,
            },
          },
          {
            $sample: { size: 1 },
          },
        ])
        .toArray()

      pulledCardIds.push(pulledCard[0]._id.toString())
      pulledCards.push(pulledCard[0])
    }

    const newAccount = await database
      .collection('dotts_accounts')
      .findOneAndUpdate(
        { _id: new ObjectId(account._id) },
        {
          $push: { ownedCards: { $each: pulledCardIds } },
          $inc: { ownedRegularPacks: -1 },
          $set: {
            newestCards: pulledCardIds,
          },
        },
        {
          returnOriginal: false,
        }
      )
    client.close()

    response.status(200).json({ pulledCards: pulledCards })
  } catch (error) {
    response.status(200).json({ error: error })
  }
  return
}

export default index

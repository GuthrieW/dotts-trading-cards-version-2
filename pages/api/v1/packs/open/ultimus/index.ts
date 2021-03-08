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
import { ULTIMUS_CHANCES } from '../constants'

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

    if (account.ownedUltimusPacks < 1) {
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
      if (chance > 0 && chance <= ULTIMUS_CHANCES.BACKUP) {
        cardRarity = BACKUP
      } else if (
        chance > ULTIMUS_CHANCES.BACKUP &&
        chance <= ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER
      ) {
        cardRarity = STARTER
      } else if (
        chance > ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR
      ) {
        cardRarity = STAR
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO
      ) {
        cardRarity = ALL_PRO
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND
      ) {
        cardRarity = LEGEND
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD
      ) {
        cardRarity = AWARD
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME
      ) {
        cardRarity = HALL_OF_FAME
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION
      ) {
        cardRarity = ULTIMUS_CHAMPION
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION
      ) {
        cardRarity = HOLOGRAPH_EXPANSION
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION +
            ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE
      ) {
        cardRarity = AUTOGRAPH_ROOKIE
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION +
            ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE &&
        chance <=
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION +
            ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
            ULTIMUS_CHANCES.FANTASY_KINGS
      ) {
        cardRarity = FANTASY_KINGS
      } else if (
        chance >
          ULTIMUS_CHANCES.BACKUP +
            ULTIMUS_CHANCES.STARTER +
            ULTIMUS_CHANCES.STAR +
            ULTIMUS_CHANCES.ALL_PRO +
            ULTIMUS_CHANCES.LEGEND +
            ULTIMUS_CHANCES.AWARD +
            ULTIMUS_CHANCES.HALL_OF_FAME +
            ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
            ULTIMUS_CHANCES.HOLOGRAPH_EXPANSION +
            ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
            ULTIMUS_CHANCES.FANTASY_KINGS &&
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
          $inc: { ownedUltimusPacks: -1 },
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
}

export default index

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

    for (let i = 0; i < 6; i++) {
      if (i == 5) {
        cardChances.push(Math.random() * (10000 - 5918) + 5918)
      } else {
        cardChances.push(Math.floor(Math.random() * 10000) + 1)
      }
    }

    let cardRarity
    for (const chance of cardChances) {
      if (chance > 0 && chance <= 3656) {
        cardRarity = BACKUP
      } else if (chance > 3656 && chance <= 5918) {
        cardRarity = STARTER
      } else if (chance > 5918 && chance <= 7558) {
        cardRarity = STAR
      } else if (chance > 7558 && chance <= 8671) {
        cardRarity = ALL_PRO
      } else if (chance > 8671 && chance <= 8851) {
        cardRarity = LEGEND
      } else if (chance > 8851 && chance <= 9004) {
        cardRarity = AWARD
      } else if (chance > 9004 && chance <= 9023) {
        cardRarity = HALL_OF_FAME
      } else if (chance > 9023 && chance <= 9422) {
        cardRarity = ULTIMUS_CHAMPION
      } else if (chance > 9422 && chance <= 9530) {
        cardRarity = HOLOGRAPH_EXPANSION
      } else if (chance > 9530 && chance <= 9660) {
        cardRarity = AUTOGRAPH_ROOKIE
      } else if (chance > 9660 && chance <= 9720) {
        cardRarity = FANTASY_KINGS
      } else if (chance > 9720 && chance <= 10000) {
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

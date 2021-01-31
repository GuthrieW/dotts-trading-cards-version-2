import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/database'
import { ObjectId } from 'mongodb'
import _ from 'lodash'
import { getAccessTokenFromHeader } from '../../../common'
import JsonWebToken from 'jsonwebtoken'

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
    const { database } = await connect()

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
      cardChances.push(Math.floor(Math.random() * 10000) + 1)
    }

    let cardRarity
    for (const chance of cardChances) {
      if (chance > 0 && chance <= 3656) {
        cardRarity = 'Backup'
      } else if (chance > 3656 && chance <= 5918) {
        cardRarity = 'Starter'
      } else if (chance > 5918 && chance <= 7558) {
        cardRarity = 'Star'
      } else if (chance > 7558 && chance <= 8671) {
        cardRarity = 'All-Pro'
      } else if (chance > 8671 && chance <= 8851) {
        cardRarity = 'Legend'
      } else if (chance > 8851 && chance <= 9004) {
        cardRarity = 'Award'
      } else if (chance > 9004 && chance <= 9023) {
        cardRarity = 'Hall of Fame'
      } else if (chance > 9023 && chance <= 9422) {
        cardRarity = 'Ultimus Champion'
      } else if (chance > 9422 && chance <= 9530) {
        cardRarity = 'Holograph Expansion'
      } else if (chance > 9530 && chance <= 9660) {
        cardRarity = 'Autograph Rookie'
      } else if (chance > 9660 && chance <= 9720) {
        cardRarity = 'Fantasy Kings'
      } else if (chance > 9720 && chance <= 10000) {
        cardRarity = 'Captain'
      } else {
        cardRarity = 'Backup'
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

    response.status(200).json({ pulledCards: pulledCards })
  } catch (error) {
    response.status(200).json({ error: error })
  }
}

export default index

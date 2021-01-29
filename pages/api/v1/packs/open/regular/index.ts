import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/database'
import { ObjectId } from 'mongodb'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { providerAccountId } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    providerAccountId: providerAccountId,
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

  for (let i = 0; i < 6; i++) {
    cardChances.push(Math.floor(Math.random() * 10000) + 1)
  }

  let cardRarity
  for (const chance of cardChances) {
    if (chance > 0 && chance <= 3922) {
      cardRarity = 'Backup'
    } else if (chance > 3922 && chance <= 6184) {
      cardRarity = 'Starter'
    } else if (chance > 6184 && chance <= 7824) {
      cardRarity = 'Star'
    } else if (chance > 7824 && chance <= 8937) {
      cardRarity = 'All-Pro'
    } else if (chance > 8937 && chance <= 9117) {
      cardRarity = 'Legend'
    } else if (chance > 9117 && chance <= 9270) {
      cardRarity = 'Award'
    } else if (chance > 9270 && chance <= 9289) {
      cardRarity = 'Hall of Fame'
    } else if (chance > 9289 && chance <= 9422) {
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
        $inc: { ownedRegularPacks: -1 },
      },
      {
        returnOriginal: false,
      }
    )

  response.status(200).json({ pulledCards: pulledCards })
}

export default index

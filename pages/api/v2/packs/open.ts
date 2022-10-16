import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { getAccessTokenFromHeader, Methods, TableNames } from '../common'
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
  CHARITY,
  LEAST_VALUABLE_PLAYER,
} from '../../../../utils/constants'
import { ObjectId } from 'mongodb'

const REGULAR_CHANCES = {
  BACKUP: 3607,
  STARTER: 2262,
  STAR: 1640,
  ALL_PRO: 1113,
  LEGEND: 180,
  AWARD: 153,
  HALL_OF_FAME: 19,
  ULTIMUS_CHAMPION: 133,
  AUTOGRAPH_ROOKIE: 130,
  CHARITY: 330,
  CAPTAIN: 280,
  // FANTASY_KINGS: 0,
  // HOLOGRAPH_EXPANSION: 0,
  // ANNIVERSARY_FIRST_TEAM: 0,
  // ANNIVERSARY_SECOND_TEAM: 0,
  LEAST_VALUABLE_PLAYER: 153,
}

const ULTIMUS_CHANCES = {
  BACKUP: 3341,
  STARTER: 2262,
  STAR: 1640,
  ALL_PRO: 1113,
  LEGEND: 180,
  AWARD: 153,
  HALL_OF_FAME: 19,
  ULTIMUS_CHAMPION: 399,
  AUTOGRAPH_ROOKIE: 130,
  CHARITY: 330,
  CAPTAIN: 280,
  // HOLOGRAPH_EXPANSION: 0,
  // FANTASY_KINGS: 0,
  // ANNIVERSARY_FIRST_TEAM: 0,
  // ANNIVERSARY_SECOND_TEAM: 0,
  LEAST_VALUABLE_PLAYER: 153,
}

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const accessToken = getAccessTokenFromHeader(request)
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    if (accessToken == null) {
      response.status(400).json({ error: 'User not authenticated' })
      return
    }

    const { packType } = body
    const { database, client } = await connect()

    try {
      // @ts-ignore
      const account = (await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })) as DottsAccount

      const isUltimusPack = packType === 'ultimus'

      if (isUltimusPack) {
        if (account.ownedUltimusPacks <= 0) {
          response
            .status(400)
            .json({ error: 'No ultimus packs available to open' })
          return
        }
      } else {
        if (account.ownedRegularPacks <= 0) {
          response
            .status(400)
            .json({ error: 'No regular packs available to open' })
          return
        }
      }

      let allWorseThanGold = true
      const cardChances: number[] = [1, 1, 1, 1, 1, 1].map((num) => {
        const newNum = Math.floor(Math.random() * 10000) + 1
        if (newNum > 7824) {
          allWorseThanGold = false
        }
        return newNum
      })

      if (allWorseThanGold) {
        cardChances[0] = 7825
      }

      const cardRarities: string[] = cardChances.map((cardChance) => {
        if (isUltimusPack) {
          return getUltimusPackRarity(cardChance)
        } else {
          return getRegularPackRarity(cardChance)
        }
      })

      const newCards: any[] = await Promise.all(
        cardRarities.map(async (cardRarity: string) => {
          const result = await database
            .collection(TableNames.DOTTS_CARDS)
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

          return result[0]
        })
      )

      const newCardIds: string[] = newCards.map((card) => card._id.toString())

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { _id: new ObjectId(account._id) },
        {
          // @ts-ignore
          $push: { ownedCards: { $each: newCardIds } },
          $inc: isUltimusPack
            ? { ownedUltimusPacks: -1 }
            : { ownedRegularPacks: -1 },
          $set: {
            newestCards: newCardIds,
          },
        }
      )

      response.status(200).json({ pulledCards: newCards })
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }
}

const getRegularPackRarity = (chance): string => {
  if (chance > 0 && chance <= REGULAR_CHANCES.BACKUP) {
    return BACKUP
  } else if (
    chance > REGULAR_CHANCES.BACKUP &&
    chance <= REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER
  ) {
    return STARTER
  } else if (
    chance > REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER &&
    chance <=
      REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER + REGULAR_CHANCES.STAR
  ) {
    return STAR
  } else if (
    chance >
      REGULAR_CHANCES.BACKUP + REGULAR_CHANCES.STARTER + REGULAR_CHANCES.STAR &&
    chance <=
      REGULAR_CHANCES.BACKUP +
        REGULAR_CHANCES.STARTER +
        REGULAR_CHANCES.STAR +
        REGULAR_CHANCES.ALL_PRO
  ) {
    return ALL_PRO
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
    return LEGEND
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
    return AWARD
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
    return HALL_OF_FAME
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
    return ULTIMUS_CHAMPION
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
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE
  ) {
    return AUTOGRAPH_ROOKIE
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
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY
  ) {
    return CHARITY
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
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY &&
    chance <=
      REGULAR_CHANCES.BACKUP +
        REGULAR_CHANCES.STARTER +
        REGULAR_CHANCES.STAR +
        REGULAR_CHANCES.ALL_PRO +
        REGULAR_CHANCES.LEGEND +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY +
        REGULAR_CHANCES.CAPTAIN
  ) {
    return CAPTAIN
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
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY +
        REGULAR_CHANCES.CAPTAIN &&
    chance <=
      REGULAR_CHANCES.BACKUP +
        REGULAR_CHANCES.STARTER +
        REGULAR_CHANCES.STAR +
        REGULAR_CHANCES.ALL_PRO +
        REGULAR_CHANCES.LEGEND +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY +
        REGULAR_CHANCES.CAPTAIN +
        REGULAR_CHANCES.LEAST_VALUABLE_PLAYER
  ) {
    return LEAST_VALUABLE_PLAYER
  } else {
    return BACKUP
  }
}

const getUltimusPackRarity = (chance): string => {
  if (chance > 0 && chance <= ULTIMUS_CHANCES.BACKUP) {
    return BACKUP
  } else if (
    chance > ULTIMUS_CHANCES.BACKUP &&
    chance <= ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER
  ) {
    return STARTER
  } else if (
    chance > ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER &&
    chance <=
      ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER + ULTIMUS_CHANCES.STAR
  ) {
    return STAR
  } else if (
    chance >
      ULTIMUS_CHANCES.BACKUP + ULTIMUS_CHANCES.STARTER + ULTIMUS_CHANCES.STAR &&
    chance <=
      ULTIMUS_CHANCES.BACKUP +
        ULTIMUS_CHANCES.STARTER +
        ULTIMUS_CHANCES.STAR +
        ULTIMUS_CHANCES.ALL_PRO
  ) {
    return ALL_PRO
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
    return LEGEND
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
    return AWARD
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
    return HALL_OF_FAME
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
    return ULTIMUS_CHAMPION
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
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE
  ) {
    return AUTOGRAPH_ROOKIE
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
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY
  ) {
    return CHARITY
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
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY &&
    chance <=
      ULTIMUS_CHANCES.BACKUP +
        ULTIMUS_CHANCES.STARTER +
        ULTIMUS_CHANCES.STAR +
        ULTIMUS_CHANCES.ALL_PRO +
        ULTIMUS_CHANCES.LEGEND +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY +
        ULTIMUS_CHANCES.CAPTAIN
  ) {
    return CAPTAIN
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
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY +
        ULTIMUS_CHANCES.CAPTAIN &&
    chance <=
      ULTIMUS_CHANCES.BACKUP +
        ULTIMUS_CHANCES.STARTER +
        ULTIMUS_CHANCES.STAR +
        ULTIMUS_CHANCES.ALL_PRO +
        ULTIMUS_CHANCES.LEGEND +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY +
        ULTIMUS_CHANCES.CAPTAIN +
        ULTIMUS_CHANCES.LEAST_VALUABLE_PLAYER
  ) {
    return LEAST_VALUABLE_PLAYER
  } else {
    return BACKUP
  }
}

export default index

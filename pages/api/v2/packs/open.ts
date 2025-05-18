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
  BASE,
  INSERT,
} from '../../../../utils/constants'
import { ObjectId } from 'mongodb'

const REGULAR_CHANCES = {
  // BACKUP: 3607,
  // STARTER: 2262,
  // STAR: 1640,
  // ALL_PRO: 1113,
  // LEGEND: 180,
  BASE: 8333, // normal value is 8802
  AWARD: 187,
  HALL_OF_FAME: 22,
  ULTIMUS_CHAMPION: 108,
  AUTOGRAPH_ROOKIE: 326,
  CHARITY: 555, // normal value is 330
  CAPTAIN: 261,
  // FANTASY_KINGS: 0,
  // HOLOGRAPH_EXPANSION: 0,
  // ANNIVERSARY_FIRST_TEAM: 0,
  // ANNIVERSARY_SECOND_TEAM: 0,
  // LEAST_VALUABLE_PLAYER: 153,
  INSERT: 208,
}

const ULTIMUS_CHANCES = {
  // BACKUP: 3341,
  // STARTER: 2262,
  // STAR: 1640,
  // ALL_PRO: 1113,
  // LEGEND: 180,
  BASE: 7500, // normal value is 8485
  AWARD: 416,
  HALL_OF_FAME: 24,
  ULTIMUS_CHAMPION: 333,
  AUTOGRAPH_ROOKIE: 555,
  CHARITY: 555, // normal value is 330
  CAPTAIN: 340,
  // HOLOGRAPH_EXPANSION: 0,
  // FANTASY_KINGS: 0,
  // ANNIVERSARY_FIRST_TEAM: 0,
  // ANNIVERSARY_SECOND_TEAM: 0,
  // LEAST_VALUABLE_PLAYER: 153,
  INSERT: 277,
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

      const cardChances: number[] = [1, 1, 1, 1, 1, 1].map(
        () => Math.floor(Math.random() * 10000) + 1
      )

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
  if (chance > 0 && chance <= REGULAR_CHANCES.BASE) {
    return BASE
  } else if (
    chance > REGULAR_CHANCES.BASE &&
    chance <= REGULAR_CHANCES.BASE + REGULAR_CHANCES.AWARD
  ) {
    return AWARD
  } else if (
    chance > REGULAR_CHANCES.BASE + REGULAR_CHANCES.AWARD &&
    chance <=
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME
  ) {
    return HALL_OF_FAME
  } else if (
    chance >
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME &&
    chance <=
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION
  ) {
    return ULTIMUS_CHAMPION
  } else if (
    chance >
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION &&
    chance <=
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE
  ) {
    return AUTOGRAPH_ROOKIE
  } else if (
    chance >
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE &&
    chance <=
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY
  ) {
    // TODO: change back to CHARITY
    return CHARITY
  } else if (
    chance >
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY &&
    chance <=
      REGULAR_CHANCES.BASE +
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
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY +
        REGULAR_CHANCES.CAPTAIN &&
    chance <=
      REGULAR_CHANCES.BASE +
        REGULAR_CHANCES.AWARD +
        REGULAR_CHANCES.HALL_OF_FAME +
        REGULAR_CHANCES.ULTIMUS_CHAMPION +
        REGULAR_CHANCES.AUTOGRAPH_ROOKIE +
        REGULAR_CHANCES.CHARITY +
        REGULAR_CHANCES.CAPTAIN +
        REGULAR_CHANCES.LEAST_VALUABLE_PLAYER
  ) {
    // TODO: Change back to LVP
    return BASE
  } else {
    return BASE
  }
}

const getUltimusPackRarity = (chance): string => {
  if (chance > 0 && chance <= ULTIMUS_CHANCES.BASE) {
    return BASE
  } else if (
    chance > ULTIMUS_CHANCES.BASE &&
    chance <= ULTIMUS_CHANCES.BASE + ULTIMUS_CHANCES.AWARD
  ) {
    return AWARD
  } else if (
    chance > ULTIMUS_CHANCES.BASE + ULTIMUS_CHANCES.AWARD &&
    chance <=
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME
  ) {
    return HALL_OF_FAME
  } else if (
    chance >
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME &&
    chance <=
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION
  ) {
    return ULTIMUS_CHAMPION
  } else if (
    chance >
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION &&
    chance <=
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE
  ) {
    return AUTOGRAPH_ROOKIE
  } else if (
    chance >
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE &&
    chance <=
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY
  ) {
    //TODO: Change back to charity
    return CHARITY
  } else if (
    chance >
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY &&
    chance <=
      ULTIMUS_CHANCES.BASE +
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
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY +
        ULTIMUS_CHANCES.CAPTAIN &&
    chance <=
      ULTIMUS_CHANCES.BASE +
        ULTIMUS_CHANCES.AWARD +
        ULTIMUS_CHANCES.HALL_OF_FAME +
        ULTIMUS_CHANCES.ULTIMUS_CHAMPION +
        ULTIMUS_CHANCES.AUTOGRAPH_ROOKIE +
        ULTIMUS_CHANCES.CHARITY +
        ULTIMUS_CHANCES.CAPTAIN +
        ULTIMUS_CHANCES.LEAST_VALUABLE_PLAYER
  ) {
    // TODO: Change back to LVP
    return BASE
  } else {
    return BASE
  }
}

export default index

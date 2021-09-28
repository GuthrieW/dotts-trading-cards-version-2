import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import _ from 'lodash'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    const accountThatCalledApi = await database
      .collection('dotts_accounts')
      .findOne({
        email: email,
      })

    if (
      !accountThatCalledApi.isAdmin &&
      !accountThatCalledApi.isSubmitter &&
      !accountThatCalledApi.isProcessor
    ) {
      response
        .status(200)
        .json({ error: 'User not permitted to update cards.' })
      return
    }

    const {
      cardId,
      playerName,
      playerTeam,
      cardRarity,
      imageUrl,
      approved,
      currentRotation,
    } = request.body

    const updatedCard = await database
      .collection('dotts_cards')
      .findOneAndUpdate(
        {
          _id: new ObjectId(cardId),
        },
        {
          $set: {
            playerName: playerName,
            playerTeam: playerTeam,
            rarity: cardRarity,
            imageUrl: imageUrl,
            approved: approved,
            currentRotation: currentRotation,
          },
        },
        {
          returnOriginal: false,
        }
      )

    client.close()

    response.status(200).json({ updatedCard: updatedCard })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

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
        .json({ error: 'User not permitted to update other accounts' })
      return
    }

    const { selectedCardIds } = request.body

    let cardIds = []

    _.forEach(selectedCardIds, (cardId) => {
      cardIds.push(new ObjectId(cardId))
    })

    const updatedCards = await database.collection('dotts_cards').updateMany(
      {
        _id: { $in: cardIds },
      },
      {
        $set: { approved: true },
      }
    )
    client.close()

    response.status(200).json({ updatedCards: updatedCards })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

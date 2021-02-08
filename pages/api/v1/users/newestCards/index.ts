import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import { getAccessTokenFromHeader } from '../../common'
import JsonWebToken from 'jsonwebtoken'
import _ from 'lodash'

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

    let objectIds = []

    _.forEach(account.newestCards, (cardId) => {
      objectIds.push(new ObjectId(cardId))
    })

    const result = await database
      .collection('dotts_cards')
      .find({ _id: { $in: objectIds } })
      .toArray()
    client.close()

    const groupedData = _.groupBy(account.newestCards)

    _.forEach(groupedData, (group) => {
      if (group.length > 1) {
        const cardToAdd = _.find(result, (card) => {
          return card._id == group[0]
        })

        _.times(group.length - 1, result.push(cardToAdd))
      }
    })

    response.status(200).json({ newestCards: result })
  } catch (error) {
    response.status(200).json({ error: error, newestCards: [] })
  }
}

export default index

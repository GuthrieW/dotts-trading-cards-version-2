import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { cardIds } = request.query
  const { database } = await connect()
  const cardObjectIds = _.forEach(cardIds, (cardId) => {
    return new ObjectId(cardId)
  })

  const result = await database
    .collection('cards')
    .find({ _id: { $in: cardObjectIds } })

  response.status(200).send(result)
}

export default index

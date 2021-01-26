import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { cardIds } = request.query

  const cardObjectIds = _.forEach(cardIds, (cardId) => {
    return new ObjectId(cardId.toString())
  })

  const result = await database
    .collection('dotts_cards')
    .find({ _id: { $in: cardObjectIds } })
    .toArray()

  response.status(200).send(result)
}

export default index

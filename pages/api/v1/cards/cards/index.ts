import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { cardIds } = request.body

  let objectIds = []

  _.forEach(cardIds, (cardId) => {
    objectIds.push(new ObjectId(cardId))
  })

  const result = await database
    .collection('dotts_cards')
    .find({ _id: { $in: objectIds } })
    .toArray()

  response.status(200).send(result)
}

export default index

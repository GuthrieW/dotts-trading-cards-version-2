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

  const groupdData = _.groupBy(cardIds)

  _.forEach(groupdData, (group) => {
    if (group.length > 1) {
      const cardToAdd = _.find(result, (card) => {
        return card._id == group[0]
      })

      _.times(group.length - 1, result.push(cardToAdd))
    }
  })

  response.status(200).send(result)
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { userId } = request.body

  const providerAccount = await database.collection('accounts').findOne({
    userId: new ObjectId(userId),
  })

  const account = await database.collection('dotts_accounts').findOne({
    providerAccountId: providerAccount.providerAccountId,
  })

  let objectIds = []

  _.forEach(account.newestCards, (cardId) => {
    objectIds.push(new ObjectId(cardId))
  })

  const result = await database
    .collection('dotts_cards')
    .find({ _id: { $in: objectIds } })
    .toArray()

  response.status(200).json({ newestCards: result })
}

export default index

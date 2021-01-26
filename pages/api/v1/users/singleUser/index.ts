import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'

// TODO - Change this to take in a providerAccountId
const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { userId } = request.body

  const providerAccount = await database.collection('accounts').findOne({
    userId: new ObjectId(userId),
  })

  const account = await database.collection('dotts_accounts').findOne({
    providerAccountId: providerAccount.providerAccountId,
  })

  response.status(200).send(account)
}

export default index

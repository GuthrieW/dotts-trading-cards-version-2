import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { userId } = request.query
  console.log(userId)
  console.log(request.query)

  const providerAccountId = await database.collection('accounts').findOne({
    userId: userId,
  })

  const account = await database.collection('dotts_accounts').findOne({
    providerAccountId: providerAccountId,
  })

  response.status(200).send(account)
}

export default index

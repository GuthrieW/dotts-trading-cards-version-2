import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { userId } = request.query
  const { database } = await connect()

  const result = await database
    .collection('accounts')
    .findOne({ userId: new ObjectId(userId.toString()) })

  response.status(200).send(result)
}

export default index

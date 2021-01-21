import { NextApiRequest, NextApiResponse } from 'next'
import { connect, disconnect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { userId } = request.query
  const { database } = await connect()
  const result = await database.collection('accounts').find({ _id: userId })

  // TODO:
  // We really need to figure out a way to allow for disconnects to happen so that we don't
  // have to worry about zombie connections
  // disconnect()
  response.status(200).send(result)
}

export default index

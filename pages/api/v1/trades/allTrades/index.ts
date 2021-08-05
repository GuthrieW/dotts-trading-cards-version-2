import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  const trades = await database.collection('dotts_trades').find({}).toArray()
  client.close()

  response.status(200).send(trades)
}

export default index

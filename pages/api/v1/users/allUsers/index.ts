import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database } = await connect()

  const accounts = await database
    .collection('dotts_accounts')
    .find({})
    .toArray()

  response.status(200).send(accounts)
}

export default index

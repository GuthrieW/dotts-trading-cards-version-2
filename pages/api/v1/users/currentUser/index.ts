import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database } = await connect()

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    const account = await database.collection('dotts_accounts').findOne({
      email: email,
    })
    response.status(200).json({ account: account })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

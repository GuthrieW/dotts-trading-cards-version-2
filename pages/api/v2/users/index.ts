import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const accessToken: string = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
  }

  const { database, client } = await connect()

  try {
    const email: string = JsonWebToken.verify(
      accessToken,
      process.env.WEBTOKEN_SECRET
    )

    const account = await database.collection('dotts_accounts').findOne({
      email: email,
    })
    response.status(200).json({ account: account })
  } catch (error) {
    response.status(200).json({ error: error })
  } finally {
    client.close()
  }

  return
}

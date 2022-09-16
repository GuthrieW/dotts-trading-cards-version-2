import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { getAccessTokenFromHeader, Methods, TableNames } from '../../common'
import JsonWebToken from 'jsonwebtoken'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request

  if (method === Methods.GET) {
    const { database, client } = await connect()

    try {
      const accessToken = getAccessTokenFromHeader(request)
      if (!accessToken) {
        response.status(200).json({ error: 'Authentication Failure' })
        return
      }

      const email = JsonWebToken.verify(
        accessToken,
        process.env.WEBTOKEN_SECRET
      )

      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })

      if (!account) {
        response
          .status(200)
          .json({ error: 'An account with that username does not exists' })
        return
      }

      response.status(200).json({
        permissions: {
          isAdmin: account.isAdmin,
          isProcessor: account.isProcessor,
          isPackIssuer: account.isPackIssuer,
          isSubmitter: account.isSubmitter,
          isSubscribed: account.isSubscribed,
        },
      })
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

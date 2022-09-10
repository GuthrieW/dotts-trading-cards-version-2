import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { getAccessTokenFromHeader, Methods, TableNames } from '../common'
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

      if (!email) {
        response.status(200).json({ error: 'Authentication Failure' })
      }

      const currentUser = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })

      response.status(200).json({ currentUser })
    } catch (error) {
      console.log(error)
    } finally {
      client.close()
      return
    }
  }
}

export default index

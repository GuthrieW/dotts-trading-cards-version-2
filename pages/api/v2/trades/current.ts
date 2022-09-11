import { ObjectId } from 'mongodb'
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
        response.status(400).json({ error: 'Error fetching user' })
        return
      }

      const tradesOfferedToUser = await database
        .collection(TableNames.DOTTS_TRADES)
        .find({ offeringUserId: account._id.toString() })
        .toArray()

      const tradesOfferedByUser = await database
        .collection(TableNames.DOTTS_TRADES)
        .find({ receivingUserId: account._id.toString() })
        .toArray()

      const allTradesInvolvingUser = [
        ...tradesOfferedToUser,
        ...tradesOfferedByUser,
      ]

      response.status(200).json({ trades: allTradesInvolvingUser })
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

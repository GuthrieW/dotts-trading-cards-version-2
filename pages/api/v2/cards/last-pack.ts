import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { getAccessTokenFromHeader, Methods, TableNames } from '../common'
import JsonWebToken from 'jsonwebtoken'
import { ObjectId } from 'mongodb'

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

      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({ email: email })

      const cardIds: string[] = account.newestCards.map(
        (card) => new ObjectId(card)
      )

      const cards = await database
        .collection(TableNames.DOTTS_CARDS)
        .find({ _id: { $in: cardIds } })
        .toArray()

      response.status(200).json({ lastOpenedPack: cards })
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

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

      const tradesOfferedToUser: any = await database
        .collection(TableNames.DOTTS_TRADES)
        .find({ offeringUserId: account._id.toString() })
        .toArray()

      const tradesOfferedByUser: any = await database
        .collection(TableNames.DOTTS_TRADES)
        .find({ receivingUserId: account._id.toString() })
        .toArray()

      const allTradesInvolvingUser: DottsTrade[] = [
        ...tradesOfferedToUser,
        ...tradesOfferedByUser,
      ]

      const userIdToUsernameMap: Map<string, string> = new Map<string, string>()
      const tradesWithUsernames: DottsTrade[] = await Promise.all(
        allTradesInvolvingUser.map(async (trade: DottsTrade) => {
          if (!userIdToUsernameMap.get(trade.offeringUserId)) {
            const offeringAccount = await database
              .collection(TableNames.DOTTS_ACCOUNTS)
              .findOne({
                _id: new ObjectId(trade.offeringUserId),
              })
            userIdToUsernameMap.set(
              offeringAccount._id.toString(),
              offeringAccount.isflUsername
            )
          }

          if (!userIdToUsernameMap.get(trade.receivingUserId)) {
            const receivingAccount = await database
              .collection(TableNames.DOTTS_ACCOUNTS)
              .findOne({
                _id: new ObjectId(trade.receivingUserId),
              })
            userIdToUsernameMap.set(
              receivingAccount._id.toString(),
              receivingAccount.isflUsername
            )
          }

          return {
            ...trade,
            offeringUsername: userIdToUsernameMap.get(trade.offeringUserId),
            receivingUsername: userIdToUsernameMap.get(trade.receivingUserId),
          }
        })
      )

      response.status(200).json({ trades: tradesWithUsernames })
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

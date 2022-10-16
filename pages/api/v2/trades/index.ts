import { NextApiRequest, NextApiResponse } from 'next'
import { TradeStatuses } from '../../../../utils/trade-statuses'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body, query } = request

  if (method === Methods.POST) {
    const {
      offeringUserId,
      receivingUserId,
      offeringUserCardIds,
      receivingUserCardIds,
    } = body
    const { database, client } = await connect()

    try {
      const insertedTrade = database
        .collection(TableNames.DOTTS_TRADES)
        .insertOne({
          offeringUserId,
          receivingUserId,
          offeringUserCardIds,
          receivingUserCardIds,
          tradeStatus: TradeStatuses.Pending,
          tradeOfferDate: new Date().toISOString(),
          tradeResolvedDate: null,
        })

      response.status(200).json({ insertedTrade })
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

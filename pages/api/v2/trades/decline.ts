import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import _ from 'lodash'
import { ObjectId } from 'mongodb'
import { getAccessTokenFromHeader, TableNames } from '../common'
import { TradeStatuses } from '../../../../utils/trade-statuses'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()
  const { tradeId } = request.body

  try {
    const result = await database
      .collection(TableNames.DOTTS_TRADES)
      .findOneAndUpdate(
        { _id: new ObjectId(tradeId) },
        { $set: { tradeStatus: TradeStatuses.Declined } }
      )

    client.close()

    response.status(200).send(result)
  } catch (error) {
    response.status(200).json({ error: error })
  }
}

export default index

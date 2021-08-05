import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  try {
    const {
      offeringUserId,
      receivingUserId,
      offeringUserCardIds,
      receivingUserCardIds,
    } = request.body

    const insertedTrade = await database.collection('dotts_trades').insertOne({
      offeringUserId,
      receivingUserId,
      offeringUserCardIds,
      receivingUserCardIds,
      tradeStatus: 'pending',
      tradeOfferDate: new Date().toISOString(),
      tradeResolvedDate: null,
    })

    client.close()

    response.status(200).json({ insertedTrade: insertedTrade })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

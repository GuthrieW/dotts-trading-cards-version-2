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
  const { userId } = request.body

  const tradesByUser = await database
    .collection('dotts_trades')
    .aggregate([
      {
        $match: {
          $or: [{ offeringUserId: userId }, { receivingUserId: userId }],
        },
      },
      {
        $project: {
          offeringUserId: {
            $toObjectId: '$offeringUserId',
          },
          offeringUserCardIds: 1,
          receivingUserId: {
            $toObjectId: '$receivingUserId',
          },
          receivingUserCardIds: 1,
          tradeStatus: 1,
          tradeOfferDate: 1,
        },
      },
      {
        $lookup: {
          from: 'dotts_accounts',
          localField: 'offeringUserId',
          foreignField: '_id',
          as: 'offeringUserInfo',
        },
      },
      {
        $lookup: {
          from: 'dotts_accounts',
          localField: 'receivingUserId',
          foreignField: '_id',
          as: 'receivingUserInfo',
        },
      },
    ])
    .toArray()

  client.close()

  response.status(200).send(tradesByUser)
}

export default index

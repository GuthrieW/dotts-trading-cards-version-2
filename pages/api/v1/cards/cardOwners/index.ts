import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()

  const { _id } = request.body

  const cardOwners = await database
       .collection('dotts_accounts')
       .aggregate([
        {
          $match: { ownedCards: { $in: [_id] } }
        },
        {
          $project: {
            ownedCards: {
              $size: { 
               $filter: {
                 input: '$ownedCards',
                 as: 'cardId',
                 cond: { '$in': [ '$$cardId', [_id] ] }
               }
             },
          },
          isflUsername: 1
        }
      }
      ]).toArray();

  client.close()

  response.status(200).json({ cardOwners })
}

export default index

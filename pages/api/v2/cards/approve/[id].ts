import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import { Methods, TableNames } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, query } = request

  if (method === Methods.PATCH) {
    const cardId: string = query.id as string
    const { database, client } = await connect()

    try {
      await database.collection(TableNames.DOTTS_CARDS).findOneAndUpdate(
        {
          _id: new ObjectId(cardId),
        },
        {
          $set: { approved: true },
        }
      )

      response.status(200).json({ cardUpdated: true })
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

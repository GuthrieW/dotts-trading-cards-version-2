import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { Methods, TableNames } from '../../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, query } = request
  if (method === Methods.DELETE) {
    const cardId: string = query.id as string
    const { database, client } = await connect()

    try {
      await database
        .collection(TableNames.DOTTS_CARDS)
        .findOneAndDelete({ _id: new ObjectId(cardId) })

      response.status(200).json({ cardDeleted: true })
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

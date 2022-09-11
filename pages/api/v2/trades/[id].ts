import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, query } = request

  if (method === Methods.GET) {
    const id = query.id as string
    const { database, client } = await connect()

    try {
      const trade = await database.collection(TableNames.DOTTS_TRADES).findOne({
        _id: new ObjectId(id),
      })

      response.status(200).json(trade)
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

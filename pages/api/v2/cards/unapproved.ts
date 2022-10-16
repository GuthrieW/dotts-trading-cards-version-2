import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request

  if (method === Methods.GET) {
    const { database, client } = await connect()

    try {
      const cards: any[] = await database
        .collection(TableNames.DOTTS_CARDS)
        .find({ approved: false })
        .toArray()

      console.log('cards', cards)

      response.status(200).json({ unapprovedCards: cards })
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

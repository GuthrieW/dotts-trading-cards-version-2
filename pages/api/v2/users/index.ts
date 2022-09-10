import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method } = request
  if (method === Methods.GET) {
    const { database, client } = await connect()

    try {
      const account: any[] = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .find()
        .toArray()
      response.status(200).json({ accounts: account })
    } catch (error) {
      response.status(200).json({ error: error })
    } finally {
      client.close()
    }
  }

  return
}

export default index

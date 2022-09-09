import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { TableNames } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body, query } = request

  if (method === 'GET') {
    const { id } = query
    const { database, client } = await connect()

    try {
      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: id,
        })

      if (!account) {
        response
          .status(200)
          .json({ error: 'An account with that username does not exists' })
        return
      }

      response.status(200).json({
        isAdmin: account.isAdmin,
        isProcessor: account.isProcessor,
        isPackIssuer: account.isPackIssuer,
        isSubmitter: account.isSubmitter,
        isSubscribed: account.isSubscribed,
      })
    } catch (error) {
      console.log(error)
    } finally {
      client.close()
      return
    }
  }
}

export default index

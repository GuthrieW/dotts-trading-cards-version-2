import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method } = request

  if (method === Methods.GET) {
    const { database, client } = await connect()

    try {
      // @ts-ignore
      const accounts = (await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .find({
          isSubscribed: true,
        })
        .project<{ isflUsername: string }>({ isflUsername: 1 })
        .toArray()) as DottsAccount[]

      const usernames: string[] = accounts.map(
        (account) => account.isflUsername
      )

      response.status(200).json({ usernames })
      return
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }
}

export default handler

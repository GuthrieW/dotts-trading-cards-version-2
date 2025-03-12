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
      console.log('finding all')
      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .find({})
        .toArray()
      console.log('found all', account.length)
      const minifiedAccounts = account.map((account) => {
        return {
          _id: account._id,
          email: account.email,
          isflUsername: account.isflUsername,
          numberOfOwnedCards: account.ownedCards.length,
          ownedRegularPacks: account.ownedRegularPacks,
          ownedUltimusPacks: account.ownedUltimusPacks,
          isSubscribed: account.isSubscribed,
          isAdmin: account.isAdmin,
          isProcessor: account.isProcessor,
          isPackIssuer: account.isPackIssuer,
          isSubmitter: account.isSubmitter,
        }
      })
      response.status(200).json({ accounts: minifiedAccounts })
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

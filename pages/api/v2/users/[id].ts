import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body, query } = request
  if (method === Methods.POST) {
    const userId: string = query.id as string
    const {
      ownedRegularPacks,
      ownedUltimusPacks,
      isAdmin,
      isSubscribed,
      isProcessor,
      isPackIssuer,
      isSubmitter,
    } = body

    const { database, client } = await connect()
    try {
      const user = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          {
            _id: new ObjectId(userId),
          },
          {
            $set: {
              ownedRegularPacks: ownedRegularPacks,
              ownedUltimusPacks: ownedUltimusPacks,
              isAdmin: isAdmin,
              isSubscribed: isSubscribed,
              isProcessor: isProcessor,
              isPackIssuer: isPackIssuer,
              isSubmitter: isPackIssuer,
            },
          }
        )

      response.status(200).json({ updatedUser: user })
      return
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

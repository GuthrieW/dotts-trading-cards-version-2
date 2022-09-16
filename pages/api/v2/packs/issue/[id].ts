import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Packs } from '../../../../../utils/packs'
import { connect } from '../../../database/database'
import { Methods, TableNames } from '../../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body, query } = request

  if (method === Methods.POST) {
    const userId: string = query.id as string
    const { packType } = body

    const { database, client } = await connect()
    try {
      const increment =
        packType === Packs.Type.Ultimus
          ? { ownedUltimusPacks: 1 }
          : { ownedRegularPacks: 1 }

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        {
          _id: new ObjectId(userId),
        },
        {
          $inc: increment,
        }
      )

      response.status(200).json({ packIssued: true })
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

export default index

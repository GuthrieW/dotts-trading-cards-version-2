import { NextApiRequest, NextApiResponse } from 'next'
import { Packs } from '../../../../../utils/packs'
import { connect } from '../../../database/database'
import { Methods, TableNames } from '../../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const { packType } = body

    const { database, client } = await connect()
    try {
      const increment =
        packType === Packs.Type.Ultimus
          ? { ownedUltimusPacks: 1 }
          : { ownedRegularPacks: 1 }

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .updateMany({ isSubscribed: true }, { $inc: increment })

      response.status(200).json({ packsIssued: true })
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

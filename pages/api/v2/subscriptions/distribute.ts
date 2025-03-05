import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { Packs } from '../../../../utils/packs'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const { database, client } = await connect()
    if (body.errors) {
      await sendSubscriptionErrorEmail(body.errors)
    }

    if (!body.successful || !Array.isArray(body.successful)) {
      response
        .status(400)
        .send('Expected array of usernames in "successful" attribute.')
      return
    }

    try {
      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .updateMany(
          { isflUsername: { $in: body.successful } },
          { $inc: { ownedRegularPacks: 1 } }
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

const sendSubscriptionErrorEmail = async (errors: string[]) => {}

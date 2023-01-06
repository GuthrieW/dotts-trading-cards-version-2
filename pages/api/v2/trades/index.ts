import { NextApiRequest, NextApiResponse } from 'next'
import { TradeStatuses } from '../../../../utils/trade-statuses'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'
import { ObjectId } from 'mongodb'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const {
      offeringUserId,
      receivingUserId,
      offeringUserCardIds,
      receivingUserCardIds,
    } = body as {
      offeringUserId: string
      receivingUserId: string
      offeringUserCardIds: string[]
      receivingUserCardIds: string[]
    }

    const { database, client } = await connect()

    const offeringUser: DottsAccount = database
      .collection(TableNames.DOTTS_ACCOUNTS)
      .findOne({
        _id: new ObjectId(offeringUserId),
      }) as unknown as DottsAccount

    const receivingUser: DottsAccount = database
      .collection(TableNames.DOTTS_ACCOUNTS)
      .findOne({
        _id: new ObjectId(receivingUserId),
      }) as unknown as DottsAccount

    const offeringUserHasCards = offeringUserCardIds.every((cardId) =>
      offeringUser.ownedCards.includes(cardId)
    )
    const receivingUserHasCards = receivingUserCardIds.every((cardId) =>
      receivingUser.ownedCards.includes(cardId)
    )

    try {
      if (!offeringUserHasCards) {
        throw new Error('You do not have the required cards')
      }

      if (!receivingUserHasCards) {
        throw new Error(
          `${receivingUser.isflUsername} does not have the required cards`
        )
      }

      const insertedTrade = database
        .collection(TableNames.DOTTS_TRADES)
        .insertOne({
          offeringUserId,
          receivingUserId,
          offeringUserCardIds,
          receivingUserCardIds,
          tradeStatus: TradeStatuses.Pending,
          tradeOfferDate: new Date().toISOString(),
          tradeResolvedDate: null,
        })

      response.status(200).json({ insertedTrade })
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

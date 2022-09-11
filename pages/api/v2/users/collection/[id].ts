import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { Methods, TableNames } from '../../common'
import { ObjectId } from 'mongodb'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body, query } = request

  if (method === Methods.GET) {
    const id = query.id as string
    const { database, client } = await connect()

    try {
      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: new ObjectId(id),
        })

      if (!account) {
        response
          .status(200)
          .json({ error: 'An account with that id does not exists' })
        return
      }

      const cardIds: string[] = account.ownedCards.map(
        (card) => new ObjectId(card)
      )

      const cardsOwnedByUser = await database
        .collection(TableNames.DOTTS_CARDS)
        .find({ _id: { $in: cardIds } })
        .toArray()

      response.status(200).json({
        isflUsername: account.isflUsername,
        cardsOwnedByUser: cardsOwnedByUser,
      })
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

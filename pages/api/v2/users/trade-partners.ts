import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'
import groupBy from 'lodash/groupBy'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body, query } = request
  if (method === Methods.POST) {
    const { sendingUserId, receivingUserId } = body
    const { database, client } = await connect()

    try {
      const sendingUserAccount = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: new ObjectId(sendingUserId),
        })

      if (!sendingUserAccount) {
        response.status(200).json({ error: 'Could not find sending user' })
        return
      }

      const sendingCardIds: string[] = sendingUserAccount.ownedCards.map(
        (card) => new ObjectId(card)
      )

      const senderCards = await database
        .collection(TableNames.DOTTS_CARDS)
        .find({ _id: { $in: sendingCardIds } })
        .toArray()

      const groupedSenderCards = groupBy(sendingUserAccount.ownedCards)
      Object.entries(groupedSenderCards).forEach(
        ([key, instances]: [string, string[]]) => {
          senderCards.find((card, index) => {
            if (String(card._id) === key) {
              senderCards[index] = {
                ...senderCards[index],
                quantity: instances.length,
              }
            }
          })
        }
      )

      const receivingUserAccount = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: new ObjectId(receivingUserId),
        })

      if (!receivingUserAccount) {
        response.status(200).json({ error: 'Could not find receiving user' })
        return
      }

      const receivingCardIds: string[] = receivingUserAccount.ownedCards.map(
        (card) => new ObjectId(card)
      )

      const receiverCards = await database
        .collection(TableNames.DOTTS_CARDS)
        .find({ _id: { $in: receivingCardIds } })
        .toArray()

      const groupedReceiverCards = groupBy(receivingUserAccount.ownedCards)
      Object.entries(groupedReceiverCards).forEach(
        ([key, instances]: [string, string[]]) => {
          receiverCards.find((card, index) => {
            if (String(card._id) === key) {
              receiverCards[index] = {
                ...receiverCards[index],
                quantity: instances.length,
              }
            }
          })
        }
      )

      response.status(200).json({
        sendingUser: sendingUserAccount,
        sendingUserCards: senderCards,
        receivingUser: receivingUserAccount,
        receivingUserCards: receiverCards,
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

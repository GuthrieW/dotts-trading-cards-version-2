import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import _ from 'lodash'
import { ObjectId } from 'mongodb'
import { Methods, TableNames } from '../common'
import { TradeStatuses } from '../../../../utils/trade-statuses'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body, query } = request

  if (method === Methods.PATCH) {
    const {
      offeringUserId,
      offeringUserCardIds,
      receivingUserId,
      receivingUserCardIds,
      _id,
    } = request.body
    const { database, client } = await connect()

    try {
      const offeringUser = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: new ObjectId(offeringUserId),
        })

      const receivingUser = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          _id: new ObjectId(receivingUserId),
        })

      const offeringUserHasCards = checkForCardsInCollection(
        offeringUser.ownedCards,
        offeringUserCardIds
      )

      const receivingUserHasCards = checkForCardsInCollection(
        receivingUser.ownedCards,
        receivingUserCardIds
      )

      if (!offeringUserHasCards || !receivingUserHasCards) {
        const currentTrade = await database
          .collection(TableNames.DOTTS_TRADES)
          .findOneAndUpdate(
            {
              _id: new ObjectId(_id),
            },
            {
              $set: {
                tradeStatus: TradeStatuses.Declined,
                tradeResolvedDate: new Date().toISOString(),
              },
            }
          )
        response
          .status(200)
          .json({ error: 'Users do not have all required cards' })
        return
      }

      offeringUserCardIds.forEach((card) => {
        offeringUser.ownedCards.splice(offeringUser.ownedCards.indexOf(card), 1)
      })

      receivingUserCardIds.forEach((card) => {
        receivingUser.ownedCards.splice(
          receivingUser.ownedCards.indexOf(card),
          1
        )
      })

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          { _id: new ObjectId(offeringUserId) },
          { $set: { ownedCards: offeringUser.ownedCards } }
        )

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { _id: new ObjectId(offeringUserId) }, // @ts-ignore
        { $push: { ownedCards: { $each: receivingUserCardIds } } }
      )

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          { _id: new ObjectId(receivingUserId) },
          { $set: { ownedCards: receivingUser.ownedCards } }
        )

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { _id: new ObjectId(receivingUserId) }, // @ts-ignore
        { $push: { ownedCards: { $each: offeringUserCardIds } } }
      )

      await database.collection('dotts_trades').findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: {
            tradeStatus: TradeStatuses.Complete,
            tradeResolvedDate: new Date().toISOString(),
          },
        }
      )

      response.status(200).json({})
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }
}

const checkForCardsInCollection = (cardCollection, tradeCards) => {
  // track indices of cards in trade with user's collection
  let cardHash = {}
  let cardArrayFromCollection = []

  tradeCards.forEach((card) => {
    // if card has already been found at least once
    if (cardHash[card]) {
      // update new "last found" position for card
      cardArrayFromCollection.push(
        cardCollection.find((element) => element._id === card)
      )
      cardHash[card] = cardCollection.indexOf(card, cardHash[card] + 1)
    }

    if (!cardHash[card]) {
      cardHash[card] = cardCollection.indexOf(card)
      cardArrayFromCollection.push(
        cardCollection.find((element) => element._id === card)
      )
    }
  })

  // if an index is -1, the user does not have all of cards in the trade.
  if (!Object.values(cardHash).every((value) => value !== -1)) {
    return false
  }

  return cardArrayFromCollection
}

export default index

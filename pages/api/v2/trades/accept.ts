import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { ObjectId } from 'mongodb'
import { Methods, TableNames } from '../common'
import { TradeStatuses } from '../../../../utils/trade-statuses'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === Methods.PATCH) {
    const {
      _id,
      offeringUserId,
      offeringUserCardIds,
      receivingUserId,
      receivingUserCardIds,
    } = body
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
        await database.collection(TableNames.DOTTS_TRADES).findOneAndUpdate(
          { _id: new ObjectId(_id) },
          {
            $set: {
              tradeStatus: TradeStatuses.Declined,
              tradeResolvedDate: new Date().toISOString(),
            },
          }
        )

        throw new Error('Users do not have all required cards')
      }

      const actualOfferingCardIds = offeringUserCardIds.map(
        (card: Card) => card._id
      )
      const actualReceivingCardIds = receivingUserCardIds.map(
        (card: Card) => card._id
      )

      const offeringUserCards: string[] = offeringUser.ownedCards
      actualOfferingCardIds.forEach((cardIdToRemove) => {
        const cardIndex = offeringUserCards.findIndex(
          (cardId) => cardId === cardIdToRemove
        )

        offeringUserCards.splice(cardIndex, 1)
      })

      const receivingUserCards: string[] = receivingUser.ownedCards
      actualReceivingCardIds.forEach((cardIdToRemove) => {
        const cardIndex = receivingUserCards.findIndex(
          (cardId) => cardId === cardIdToRemove
        )

        receivingUserCards.splice(cardIndex, 1)
      })

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          { _id: new ObjectId(offeringUserId) },
          { $set: { ownedCards: offeringUserCards } }
        )

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { _id: new ObjectId(offeringUserId) }, // @ts-ignore
        { $push: { ownedCards: { $each: actualReceivingCardIds } } }
      )

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          { _id: new ObjectId(receivingUserId) },
          { $set: { ownedCards: receivingUserCards } }
        )

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { _id: new ObjectId(receivingUserId) }, // @ts-ignore
        { $push: { ownedCards: { $each: actualOfferingCardIds } } }
      )

      await database.collection(TableNames.DOTTS_TRADES).findOneAndUpdate(
        { _id: new ObjectId(_id) },
        {
          $set: {
            tradeStatus: TradeStatuses.Completed,
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

  console.log('collection', cardCollection)

  tradeCards.forEach((card: Card) => {
    if (cardHash[card._id]) {
      cardArrayFromCollection.push(
        cardCollection.find((element) => element._id === card._id)
      )
      cardHash[card._id] = cardCollection.indexOf(
        card._id,
        cardHash[card._id] + 1
      )
    }

    if (!cardHash[card._id]) {
      cardHash[card._id] = cardCollection.indexOf(card._id)
      cardArrayFromCollection.push(
        cardCollection.find((element) => element._id === card._id)
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

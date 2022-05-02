import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import { ObjectId } from 'mongodb'
import { getAccessTokenFromHeader } from '../../common'

let checkForCardsInCollection = (cardCollection, tradeCards) => {
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

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  try {
    const {
      offeringUserId,
      offeringUserCardIds,
      receivingUserId,
      receivingUserCardIds,
      _id,
    } = request.body

    const offeringUserInfo = await database
      .collection('dotts_accounts')
      .findOne({
        _id: new ObjectId(offeringUserId),
      })

    const offeringUserHasCards = checkForCardsInCollection(
      offeringUserInfo.ownedCards,
      offeringUserCardIds
    )

    if (!offeringUserHasCards) {
      response
        .status(200)
        .json({ error: 'Offering user does not have required cards.' })
      return
    }

    const receivingUserInfo = await database
      .collection('dotts_accounts')
      .findOne({
        _id: new ObjectId(receivingUserId),
      })

    const receivingUserHasCards = checkForCardsInCollection(
      receivingUserInfo.ownedCards,
      receivingUserCardIds
    )

    if (!receivingUserHasCards) {
      response
        .status(200)
        .json({ error: 'Receiving user does not have required cards.' })
      return
    }

    offeringUserCardIds.forEach((card) => {
      offeringUserInfo.ownedCards.splice(
        offeringUserInfo.ownedCards.indexOf(card),
        1
      )
    })

    receivingUserCardIds.forEach((card) => {
      receivingUserInfo.ownedCards.splice(
        receivingUserInfo.ownedCards.indexOf(card),
        1
      )
    })

    await database.collection('dotts_accounts').findOneAndUpdate(
      {
        _id: new ObjectId(offeringUserId),
      },
      {
        $set: {
          ownedCards: offeringUserInfo.ownedCards,
        },
      }
    )

    await database.collection('dotts_accounts').findOneAndUpdate(
      {
        _id: new ObjectId(offeringUserId),
      },
      {
        $push: {
          // @ts-ignore
          ownedCards: { $each: receivingUserCardIds },
        },
      }
    )

    await database.collection('dotts_accounts').findOneAndUpdate(
      {
        _id: new ObjectId(receivingUserId),
      },
      {
        $set: {
          ownedCards: receivingUserInfo.ownedCards,
        },
      }
    )

    await database.collection('dotts_accounts').findOneAndUpdate(
      {
        _id: new ObjectId(receivingUserId),
      },
      {
        $push: {
          // @ts-ignore
          ownedCards: { $each: offeringUserCardIds },
        },
      }
    )

    const currentTrade = await database
      .collection('dotts_trades')
      .findOneAndUpdate(
        {
          _id: new ObjectId(_id),
        },
        { $set: { tradeStatus: 'completed' } }
      )

    client.close()

    response
      .status(200)
      .json({ currentTrade: currentTrade, status: 'Trade complete!' })
  } catch (error) {
    response.status(200).json({ error: error })
  }
}

export default index

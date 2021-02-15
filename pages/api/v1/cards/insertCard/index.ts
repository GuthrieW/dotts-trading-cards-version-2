import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const {
    playerName,
    currentTeam,
    rarity,
    imageUrl,
    submissionUsername,
  } = request.body

  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    const accountThatCalledApi = await database
      .collection('dotts_accounts')
      .findOne({
        email: email,
      })

    if (!accountThatCalledApi.isAdmin && !accountThatCalledApi.isSubmitter) {
      response
        .status(200)
        .json({ error: 'User not permitted to update other accounts' })
      return
    }

    const insertedCard = await database.collection('dotts_cards').insertOne({
      playerName: playerName,
      playerTeam: currentTeam,
      rarity: rarity,
      imageUrl: imageUrl,
      submissionUsername: submissionUsername,
      submissionDate: new Date().toISOString(),
      approved: false,
      currentRotation: false,
    })

    client.close()

    response.status(200).json({ insertedCard: insertedCard })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

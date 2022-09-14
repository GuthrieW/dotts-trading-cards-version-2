import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body, query } = request
  if (method === Methods.POST) {
    const { imageUrl, playerName, playerTeam, rarity, submissionUsername } =
      body

    const { database, client } = await connect()
    try {
      const newCard = await database
        .collection(TableNames.DOTTS_CARDS)
        .insertOne({
          playerName: playerName,
          playerTeam: playerTeam,
          rarity: rarity,
          imageUrl: imageUrl,
          submissionUsername: submissionUsername,
          submissionDate: new Date().toISOString(),
          approved: false,
          currentRotation: false,
        })

      response.status(200).json({ card: newCard })
      return
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

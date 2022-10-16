import { ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body, query } = request
  if (method === Methods.PATCH) {
    const cardId: string = query.id as string
    const {
      approved,
      currentRotation,
      imageUrl,
      playerName,
      playerTeam,
      rarity,
    } = body

    const { database, client } = await connect()
    try {
      const card = await database
        .collection(TableNames.DOTTS_CARDS)
        .findOneAndUpdate(
          {
            _id: new ObjectId(cardId),
          },
          {
            $set: {
              approved: approved,
              currentRotation: currentRotation,
              imageUrl: imageUrl,
              playerName: playerName,
              playerTeam: playerTeam,
              rarity: rarity,
            },
          }
        )

      response.status(200).json({ updatedCard: card })
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

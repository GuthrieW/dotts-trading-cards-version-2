import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request

  if (method === Methods.POST) {
    const { database, client } = await connect()

    try {
      const orbitingDeath = []
      const connorM = []
      const kotasa = []
      const qWest = []
      const shadyShoelace = []
      const laser = []
      const limJahey = []
      const fleshBagSoup = []
      const starboy = []

      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { isflUsername: '' }, // @ts-ignore
        { $push: { ownedCards: { $each: newCardsForOrbitingDeath } } }
      )
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }

    await database
  }

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

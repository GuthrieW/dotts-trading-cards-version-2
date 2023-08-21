import { Db } from 'mongodb'
import { TableNames } from '../common'

export const issueCharityCards = async (database: Db): Promise<void> => {
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
}

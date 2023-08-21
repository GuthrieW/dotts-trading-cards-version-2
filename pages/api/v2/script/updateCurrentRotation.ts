import { Db } from 'mongodb'
import { TableNames } from '../common'
import { BASE } from '../../../../utils/constants'

export const updateCurrentRotation = async (database: Db): Promise<void> => {
  await database
    .collection(TableNames.DOTTS_CARDS)
    .updateMany({ currentRotation: true }, { $set: { currentRotation: false } })

  await database
    .collection(TableNames.DOTTS_CARDS)
    .updateMany({ rarity: BASE }, { $set: { currentRotation: true } })

  return
}

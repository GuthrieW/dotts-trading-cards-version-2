import { Db } from 'mongodb'
import { TableNames } from '../common'
import { BASE, HALL_OF_FAME } from '../../../../utils/constants'

export const updateCurrentRotation = async (database: Db): Promise<void> => {
  // await database
  //   .collection(TableNames.DOTTS_CARDS)
  //   .updateMany({ currentRotation: true }, { $set: { currentRotation: false } })

  // await database
  //   .collection(TableNames.DOTTS_CARDS)
  //   .updateMany({ rarity: BASE }, { $set: { currentRotation: true } })

  const afterDate = new Date(2023, 0, 1)

  await database
    .collection(TableNames.DOTTS_CARDS)
    .updateMany(
      { submissionDate: { $gt: afterDate.toISOString() } },
      { $set: { currentRotation: true } }
    )

  await database
    .collection(TableNames.DOTTS_CARDS)
    .updateMany({ rarity: HALL_OF_FAME }, { $set: { currentRotation: true } })

  return
}

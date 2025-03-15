import { Db } from 'mongodb'
import { TableNames } from '../common'

export const issueCharityCards = async (database: Db): Promise<void> => {
  const usersToAddCards: { name: string; cards: string[] }[] = [
    {
      name: 'Raven',
      cards: ['64e6c5de3f2686b64a814558', '60e6001af3d462000823c542'],
    },
  ]

  await Promise.all(
    await usersToAddCards.map(async (user) => {
      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { isflUsername: user.name }, // @ts-ignore
        { $push: { ownedCards: { $each: user.cards } } }
      )
    })
  )

  return
}

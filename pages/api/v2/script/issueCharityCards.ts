import { Db } from 'mongodb'
import { TableNames } from '../common'

// Griff - 68c5ee196eb2f70eddc1f171
// Coachsj35 - 68c5ee426eb2f70eddc1f172
// lemonoppy - 68c5ede46eb2f70eddc1f16f
// DivogoJota - 68c5edfe6eb2f70eddc1f170
// Mooty99 - 639a06b7238f3e8dc0e78718
// Mooty99 - 65b0a7e0aee35baeb17345e5
// Mooty99 - 63656042538674b45b5b8d92

export const issueCharityCards = async (database: Db): Promise<void> => {
  const usersToAddCards: { name: string; cards: string[] }[] = [
    {
      name: 'Griff',
      cards: ['68c5ee196eb2f70eddc1f171'],
    },
    {
      name: 'Coachsj35',
      cards: ['68c5ee426eb2f70eddc1f172'],
    },
    {
      name: 'lemonoppy',
      cards: ['68c5ede46eb2f70eddc1f16f'],
    },
    {
      name: 'DivogoJota',
      cards: ['68c5edfe6eb2f70eddc1f170'],
    },
    {
      name: 'Mooty99',
      cards: [
        '639a06b7238f3e8dc0e78718',
        '65b0a7e0aee35baeb17345e5',
        '63656042538674b45b5b8d92',
      ],
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

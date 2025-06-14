import { Db } from 'mongodb'
import { TableNames } from '../common'

// 6831115c879c79c39a374cdc - Zag
// 68311150879c79c39a374cdb - ValorX77
// 68311148879c79c39a374cda - Raven
// 68311141879c79c39a374cd9 - OrbitingDeath
// 68311139879c79c39a374cd8 - lemonoppy
// 68311132879c79c39a374cd7 - Kyamprac
// 68311128879c79c39a374cd6 - jeffie43
// 68311120879c79c39a374cd5 - JDC4654
// 683111112ac87c8bb803dc74 - Im2Klutch
// 683111082ac87c8bb803dc73 - enigmatic
// 683110fe06848f7209e6c45a - caltroit_red_flames
// 683110f506848f7209e6c459 - Amidships

export const issueCharityCards = async (database: Db): Promise<void> => {
  const usersToAddCards: { name: string; cards: string[] }[] = [
    {
      name: 'im2klutch',
      cards: ['683111112ac87c8bb803dc74'],
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

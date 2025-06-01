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
      name: 'Zag',
      cards: ['6831115c879c79c39a374cdc'],
    },
    {
      name: 'ValorX77',
      cards: ['68311150879c79c39a374cdb'],
    },
    {
      name: 'Raven',
      cards: ['68311148879c79c39a374cda'],
    },
    {
      name: 'OrbitingDeath',
      cards: ['68311141879c79c39a374cd9'],
    },
    {
      name: 'lemonoppy',
      cards: ['68311139879c79c39a374cd8'],
    },
    {
      name: 'Kyamprac',
      cards: ['68311132879c79c39a374cd7'],
    },
    {
      name: 'jeffie43',
      cards: ['68311128879c79c39a374cd6'],
    },
    {
      name: 'JDC4654',
      cards: ['68311120879c79c39a374cd5'],
    },
    {
      name: 'Im2Klutch',
      cards: ['683111112ac87c8bb803dc74'],
    },
    {
      name: 'enigmatic',
      cards: ['683111082ac87c8bb803dc73'],
    },
    {
      name: 'caltroit_red_flames',
      cards: ['683110fe06848f7209e6c45a'],
    },
    {
      name: 'Amidships',
      cards: ['683110f506848f7209e6c459'],
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

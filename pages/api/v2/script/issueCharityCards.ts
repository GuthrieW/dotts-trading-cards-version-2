import { Db } from 'mongodb'
import { TableNames } from '../common'

export const issueCharityCards = async (database: Db): Promise<void> => {
  const usersToAddCards: { name: string; cards: string[] }[] = [
    {
      name: 'Raven',
      cards: ['653dcd2f95a875e6a766d398'],
    },
    {
      name: 'swoosh',
      cards: ['653dba0a51984f2ffc582ee2', '653dcd0395a875e6a766d397'],
    },
    {
      name: 'Tmoney6996',
      cards: ['653b400c499b4ef4f291a7fe'],
    },
    {
      name: 'DarknessRising',
      cards: ['67c7c6b869c7773a9e1c2a75'],
    },
    {
      name: 'Laser',
      cards: ['67c7e8b87611e45b2345ddf0'],
    },
    {
      name: 'LtHudz',
      cards: ['67c7dd914527b0aeff76cb14'],
    },
    {
      name: 'juniped',
      cards: [
        '67c7dd804527b0aeff76cb13',
        '67c7dd714527b0aeff76cb12',
        '67c7dd5e4527b0aeff76cb11',
        '67c7eebe57e2d5533e591de5',
      ],
    },
    {
      name: 'Mooty99',
      cards: [
        '5eefe539556d00001779ff9f',
        '60bec8ac444bc70009772c17',
        '65adeb0d07eb954542b33a51',
        '615a75e1e83ae90008757a02',
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

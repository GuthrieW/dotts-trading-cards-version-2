import { Db } from 'mongodb'
import { TableNames } from '../common'
import { ObjectId } from 'mongodb'

export const issueCharityCards = async (database: Db): Promise<void> => {
  const usersToAddCards: { name: string; cards: string[] }[] = [
    {
      name: 'OrbitingDeath',
      cards: [
        '635bf65d2f71667765148d7e', // Nova Montagne - Captain - NOT CREATED
        '64e37c0f8f52d15695cc1984', // Stan Francisco - Franchise Icon
        '64e37d9c8f52d15695cc1987', // Immanuel Blackstone Captain
      ],
    },
    {
      name: 'ConnorM123',
      cards: [
        '64e37c918f52d15695cc1985', // Franklin Armstrong Franchise Icon
      ],
    },
    {
      name: 'Kotasa',
      cards: [
        '64e37cd1f6541782e5f038a8', // Nate Swift Franchise Icon
        // '', // Dermot Lavelle Sr. DPOTY Award
      ],
    },
    {
      name: 'qWest',
      cards: [
        '612cf2324ec24f0008a40fca', // S22 Rookie Auto Tatsu Nakamura, RB #7, OCO, Taylor Rapp Render
        '61cca4a3122fdf0008d1d31e', // S21 Awards Winner MVP Franklin Armstrong, QB #1, OCO
        '61db018c4370c7000918a8e2', // S22 Ultimus Champion Mo Berry, LB #7, COL, Mohamed Barry Render
        '60e9c1f7b92e9b00098d09df', // S18 Rookie Auto Jay Cue, QB #10, AZ, Johnny Manziel Render
      ],
    },
    {
      name: 'shadyshoelace',
      cards: [
        '61ce1355fec58e000826600a', // Rookie card - Nero Alexander - Wraiths - DE - #92 - Chris Long
        '61cca002d256dc0008c77716', // Award card - S17 Defensive Lineman of the Year - Nero Alexander - Wraiths - #92 - Chris Long
      ],
    },
    // CARD NOT MADE YET
    // {
    //   name: 'Laser',
    //   cards: [
    //     '', // Dexter Zaylren - Autograph Rookie - Not created
    //     '612cf1bf4ec24f0008a40fc8', // (Korrin Abernathy Rookie Series, render Ross Cockrell, #31)
    //   ],
    // },
    // CARD NOT MADE YET
    // {
    //   name: 'LimJahey',
    //   cards: [
    //     '', // Von Hayes - Autograph Rookie - Not created
    //   ],
    // },
    // CARD NOT MADE YET
    // {
    //   name: 'Fleshbagsoup',
    //   cards: [
    //     '', // A unique card he has not specified yet
    //   ],
    // },
    // USER DOES NOT EXIST
    // {
    //   name: 'Starboy',
    //   cards: [
    //     '64e37f5e8f52d15695cc1988', // James Bishop - Ultimus Champion card
    //   ],
    // },
    {
      name: 'DarknessRising',
      cards: [
        '5f754423f26c5400176aab87', // Asher Montain - Autograph Rookie - Not created
      ],
    },
    {
      name: 'JuOSu',
      cards: [
        '64e37c0f8f52d15695cc1984', // Stan Francisco - Franchise Icon 1/3 - Created but not approved
      ],
    },
    {
      name: 'PMoney',
      cards: [
        '64e37c0f8f52d15695cc1984', // Stan Francisco - Franchise Icon 3/3 - Not created
      ],
    },
    {
      name: 'br0_0ker',
      cards: ['64e37e3ff6541782e5f038a9'],
    },
  ]

  await Promise.all(
    await usersToAddCards.map(async (user) => {
      const username = new ObjectId(user.name)
      await database.collection(TableNames.DOTTS_ACCOUNTS).findOneAndUpdate(
        { isflUsername: username }, // @ts-ignore
        { $push: { ownedCards: { $each: user.cards } } }
      )
    })
  )
}

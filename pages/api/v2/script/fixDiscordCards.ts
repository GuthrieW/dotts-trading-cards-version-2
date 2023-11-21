import { Db } from 'mongodb'
import { TableNames } from '../common'

export const fixDiscordCards = async (
  database: Db,
  scriptData: string
): Promise<any[]> => {
  const cardsData = JSON.parse(scriptData)
  Object.entries(cardsData).map(([key, value]) => {
    console.log('key', key)
    console.log('value', value)
  })

  return null
}

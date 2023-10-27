import { Db } from 'mongodb'
import { TableNames } from '../common'

export const getDiscordCards = async (database: Db): Promise<any[]> => {
  const cards: any[] = await database
    .collection(TableNames.DOTTS_CARDS)
    .find({
      imageUrl: { $regex: 'discord' },
    })
    .toArray()

  return cards.map((card) => ({
    _id: card._id,
    imageUrl: card.imageUrl,
  }))
}

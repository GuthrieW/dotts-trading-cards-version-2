import { Db } from 'mongodb'
import { TableNames } from '../common'

export const getImgurCards = async (database: Db): Promise<any[]> => {
  const cards: any[] = await database
    .collection(TableNames.DOTTS_CARDS)
    .find({
      image_url: { $regex: 'imgur' },
    })
    .toArray()

  return cards.map((card) => ({
    _id: card._id,
    image_url: card.image_url,
  }))
}

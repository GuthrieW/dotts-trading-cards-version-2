import { Db, ObjectId } from 'mongodb'
import { TableNames } from '../common'

export const fixDiscordCards = async (
  database: Db,
  scriptData: string
): Promise<any[]> => {
  const cardsData = JSON.parse(scriptData)
  return Object.values(cardsData).map(async (cardData) => {
    const { _id, new_image_url, old_image_url } = cardData as {
      _id
      new_image_url
      old_image_url
    }

    const card = await database
      .collection(TableNames.DOTTS_CARDS)
      .findOneAndUpdate(
        { _id: new ObjectId(_id) },
        { $set: { image_url: new_image_url } }
      )

    return {
      ...card,
      imageUrl: new_image_url,
    }
  })
}

import { Db, ObjectId } from 'mongodb'
import { TableNames } from '../common'

export const fixDiscordCards = async (
  database: Db,
  scriptData: string
): Promise<any[]> => {
  const cardsData = JSON.parse(scriptData)
  const result = await Promise.all(
    await Object.values(cardsData).map(async (cardData) => {
      const { _id, new_image_url, old_image_url } = cardData as {
        _id
        new_image_url
        old_image_url
      }

      console.log('cardData', cardData)

      await database
        .collection(TableNames.DOTTS_CARDS)
        .findOneAndUpdate(
          { _id: new ObjectId(_id) },
          { $set: { imageUrl: new_image_url } }
        )

      return {
        _id,
        imageUrl: new_image_url,
      }
    })
  )

  return result
}

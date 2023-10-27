import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods } from '../common'
import { updateCurrentRotation } from './updateCurrentRotation'
import { issueCharityCards } from './issueCharityCards'
import { getDiscordCards } from './getDiscordCards'
import { Db, MongoClient } from 'mongodb'

const scripts: Record<
  string,
  (database: Db, client: MongoClient) => Promise<any>
> = {
  updateCurrentRotation: updateCurrentRotation,
  issueCharityCards: issueCharityCards,
  getDiscordCards: getDiscordCards,
}

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  const scriptName: string = body.scriptName

  if (method === Methods.POST) {
    const { database, client } = await connect()

    try {
      const result = await scripts[scriptName](database, client)
      if (result) {
        response.status(200).json(result)
      } else {
        response.status(200).json({ success: true })
      }
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods } from '../common'
import { updateCurrentRotation } from './updateCurrentRotation'
import { issueCharityCards } from './issueCharityCards'
import { Db, MongoClient } from 'mongodb'

const scripts: Record<
  string,
  (database: Db, client: MongoClient) => Promise<void>
> = {
  updateCurrentRotation: updateCurrentRotation,
  issueCharityCards: issueCharityCards,
}

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  const scriptName: string = body.scriptName

  if (method === Methods.POST) {
    const { database, client } = await connect()

    try {
      await scripts[scriptName](database, client)
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

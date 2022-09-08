import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import bcrypt from 'bcryptjs'
import { TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === 'POST') {
    const { email, isflUsername, password } = body
    const { database, client } = await connect()

    try {
      const accountUsernameExists = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          isflUsername: isflUsername,
        })

      const accountEmailExists = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })

      if (accountUsernameExists != null) {
        response
          .status(200)
          .json({ error: 'An account with that username already exists' })
        return
      }

      if (accountEmailExists != null) {
        response
          .status(200)
          .json({ error: 'An account with that email already exists' })
        return
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await database.collection(TableNames.DOTTS_ACCOUNTS).insertOne({
        email: email,
        isflUsername: isflUsername,
        password: hashedPassword,
        ownedCards: [],
        newestcards: [],
        ownedRegularPacks: 1,
        ownedUltimusPacks: 0,
        isAdmin: false,
        isProcessor: false,
        isPackIssuer: false,
        isSubmitter: false,
        isSubscribed: false,
      })

      response.status(201).json({
        success: 'success',
      })
    } catch (error) {
      console.log(error)
    } finally {
      client.close()
      return
    }
  }
}

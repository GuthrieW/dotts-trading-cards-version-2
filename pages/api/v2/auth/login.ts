import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import bcrypt from 'bcryptjs'
import JsonWebToken from 'jsonwebtoken'
import { TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === 'POST') {
    const { email, password } = body
    const { database, client } = await connect()

    try {
      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })

      if (!account) {
        response.status(200).json({ error: 'Authentication Failed' })
        return
      }

      bcrypt.compare(password, account.password, async (error, result) => {
        if (error != null) {
          response.status(200).json({ error: 'Internal Server Error' })
        } else if (result) {
          const accessToken = await JsonWebToken.sign(
            email,
            process.env.WEBTOKEN_SECRET
          )
          response.status(200).json({ accessToken: accessToken })
        } else {
          response.status(200).json({ error: 'Authentication Failed' })
        }
      })
    } catch (error) {
      console.log(error)
    } finally {
      client.close()
      return
    }
  }

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import JsonWebToken from 'jsonwebtoken'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { email, password } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    email: email,
  })

  if (!account) {
    response.status(200).json({ error: 'No user exists with that email.' })
    return
  }

  client.close()

  const hashedPassword = account.password

  bcrypt.compare(password, hashedPassword, async (error, result) => {
    if (error != null) {
      response.status(200).json({ error: 'Internal Server Error' })
      return
    } else if (result) {
      const accessToken = await JsonWebToken.sign(
        email,
        process.env.WEBTOKEN_SECRET
      )
      response.status(200).json({ accessToken: accessToken })
      return
    } else {
      response
        .status(200)
        .json({ error: 'The password you have entered is incorrect' })
      return
    }
  })
  return
}

export default index

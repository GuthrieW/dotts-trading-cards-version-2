import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../../database/database'
import _ from 'lodash'
import bcrypt from 'bcrypt'
import JsonWebToken from 'jsonwebtoken'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { email, password } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    email: email,
  })

  const hashedPassword = account.password
  bcrypt.compare(password, hashedPassword, (error, result) => {
    if (error) {
      response.status(200).json({ error: 'Internal Server Error' })
    } else if (result) {
      const accessToken = JsonWebToken.sign(email, process.env.WEBTOKEN_SECRET)
      response.status(200).json({ accessToken: accessToken })
    } else {
      response
        .status(200)
        .json({ error: 'The passowrd you have entered is incorrect' })
    }
  })
}

export default index

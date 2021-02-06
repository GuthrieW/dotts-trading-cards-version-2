import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import bcrypt from 'bcrypt'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { email, isflUsername, password } = request.body

  const checkAccountUsername = await database
    .collection('dotts_accounts')
    .findOne({
      isflUsername: isflUsername,
    })

  if (checkAccountUsername != null) {
    response
      .status(200)
      .json({ error: 'An account with that ISFL username already exists' })
    return
  }

  const checkAccountEmail = await database
    .collection('dotts_accounts')
    .findOne({
      email: email,
    })

  if (checkAccountEmail != null) {
    response
      .status(200)
      .json({ error: 'An account with that email already exists' })
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  await database.collection('dotts_accounts').insertOne({
    email: email,
    isflUsername: isflUsername,
    password: hashedPassword,
    ownedCards: [],
    newestcards: [],
    ownedRegularPacks: 0,
    ownedUltimusPacks: 0,
    isAdmin: false,
    isProcessor: false,
    isPackIssuer: false,
    isSubmitter: false,
    isSubscribed: false,
  })
  client.close()

  response.status(201).json({
    success: 'success',
  })
}

export default index

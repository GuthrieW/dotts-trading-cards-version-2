import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'

// TODO - Change this to take in a providerAccountId
const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { email } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    email: email,
  })
  client.close()

  response.status(200).send(account)
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()

  const accounts = await database
    .collection('dotts_accounts')
    .find({})
    .toArray()

  response.status(200).send(accounts)
}

export default index

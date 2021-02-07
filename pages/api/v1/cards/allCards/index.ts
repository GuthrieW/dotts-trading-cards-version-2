import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()

  const result = await database.collection('dotts_cards').find({}).toArray()

  client.close()

  response.status(200).send(result)
}

export default index

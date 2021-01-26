import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()

  const result = await database.collection('cards').find({}).toArray()

  response.status(200).send(result)
}

export default index

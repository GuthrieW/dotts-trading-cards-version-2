import { NextApiRequest, NextApiResponse } from 'next'
import { ObjectId } from 'mongodb'
import { connect } from '../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const result = await database.collection('accounts').find()

  response.status(200).send(result)
}

export default index

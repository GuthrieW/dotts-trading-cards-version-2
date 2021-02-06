import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'
import { ObjectId } from 'mongodb'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { cardId } = request.body

  const result = await database
    .collection('dotts_cards')
    .findOneAndDelete({ _id: new ObjectId(cardId) })

  response.status(200).send(result)
}

export default index

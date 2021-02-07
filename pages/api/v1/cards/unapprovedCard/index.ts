import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()

  try {
    const unapprovedCard = await database.collection('dotts_cards').findOne({
      approved: false,
    })
    client.close()

    response.status(200).json({ unapprovedCard: unapprovedCard })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

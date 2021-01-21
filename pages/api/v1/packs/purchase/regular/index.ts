import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../../database/database'
import _ from 'lodash'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  response.status(200).send({})
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method } = request

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'

export const index = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

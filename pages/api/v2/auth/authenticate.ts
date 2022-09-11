import { NextApiRequest, NextApiResponse } from 'next'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(400).json({ isAuthenticated: false, error: true })
    return
  }

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    response.status(200).json({ isAuthenticated: true })
  } catch (error) {
    response.status(400).json({ isAuthenticated: false, error })
    return
  }
  return
}

export default index

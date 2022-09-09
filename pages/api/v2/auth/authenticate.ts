import { NextApiRequest, NextApiResponse } from 'next'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  console.log('accessToken', accessToken)
  if (accessToken == null) {
    response.status(200).json({ isAuthenticated: false })
    return
  }

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    console.log('email', email)
    response.status(200).json({ isAuthenticated: true })
  } catch (error) {
    response.status(200).json({ isAuthenticated: false })
  }
  return
}

export default index

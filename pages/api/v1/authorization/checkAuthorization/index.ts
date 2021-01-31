import { NextApiRequest, NextApiResponse } from 'next'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    response.status(200).json({ email: email })
  } catch (error) {
    response.status(200).json({ error: 'Invalid JSON Web Token' })
  }
  return
}

export default index

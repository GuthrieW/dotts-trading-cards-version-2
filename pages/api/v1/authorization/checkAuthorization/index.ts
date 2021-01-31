import { NextApiRequest, NextApiResponse } from 'next'
// import { connect } from '../../../database/database'
import JsonWebToken from 'jsonwebtoken'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  console.log('request.headers', request.headers)
  await Authenticate(request, response)
  return
}

const Authenticate = async (request, response) => {
  const authenticationHeader = request.headers['authorization']
  const token = authenticationHeader && authenticationHeader.split(' ')[1]

  if (token == null) {
    return { error: 'User not authenticated' }
  }

  JsonWebToken.verify(token, process.env.WEBTOKEN_SECRET, (error, result) => {
    console.log('result', result)
    if (error) {
      response.status(200).json({ error: 'Invalid JWT' })
      return
    } else {
      response.status(200).json({ success: 'success' })
      return
    }
  })
}

export default index

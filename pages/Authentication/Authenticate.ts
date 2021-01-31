import JsonWebToken from 'jsonwebtoken'

const Authenticate = async (request) => {
  const authenticationHeader = request.headers['authorization']
  const token = authenticationHeader && authenticationHeader.split(' ')[1]

  if (token == null) {
    return { error: 'User not authenticated' }
  }

  JsonWebToken.verify(token, process.env.WEBTOKEN_SECRET, (error, result) => {
    if (error) {
      return { error: 'Invalid JWT' }
    }

    return { success: 'Valid JWT' }
  })
}

export default Authenticate

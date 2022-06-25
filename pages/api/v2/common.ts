import { NextApiRequest } from 'next'

export const getAccessTokenFromHeader = (request: NextApiRequest): string => {
  const authenticationHeader: string = request.headers['authorization']
  if (authenticationHeader) {
    return authenticationHeader.split(' ')[1]
  }

  return null
}

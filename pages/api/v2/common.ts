import { NextApiRequest } from 'next'

export const getAccessTokenFromHeader = (request: NextApiRequest): string => {
  const authenticationHeader: string = request.headers['authorization']
  if (authenticationHeader) {
    return authenticationHeader.split(' ')[1]
  }

  return null
}

export const TableNames = {
  DOTTS_ACCOUNTS: 'dotts_accounts',
}

export const Methods = {
  POST: 'POST',
  GET: 'GET',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
  PUT: 'PUT',
}

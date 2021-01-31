export const getAccessTokenFromHeader = (request) => {
  const authenticationHeader = request.headers['authorization']
  const token = authenticationHeader && authenticationHeader.split(' ')[1]
  return token
}

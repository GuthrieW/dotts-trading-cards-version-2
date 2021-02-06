import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

  try {
    const currentUserEmail = JsonWebToken.verify(
      accessToken,
      process.env.WEBTOKEN_SECRET
    )
    const accountThatCalledApi = await database
      .collection('dotts_accounts')
      .findOne({
        email: currentUserEmail,
      })

    if (!accountThatCalledApi.isAdmin && !accountThatCalledApi.isPackIssuer) {
      response
        .status(200)
        .json({ error: 'User not permitted to update other accounts' })
      return
    }

    const {
      oldIsflUsername,
      email,
      isflUsername,
      isSubscribed,
      isAdmin,
      isPackIssuer,
      isProcessor,
      isSubmitter,
    } = request.body

    const updatedAccount = await database
      .collection('dotts_accounts')
      .findOneAndUpdate(
        {
          isflUsername: oldIsflUsername,
        },
        {
          $set: {
            email: email,
            isflUsername: isflUsername,
            isSubscribed: isSubscribed,
            isAdmin: isAdmin,
            isPackIssuer: isPackIssuer,
            isProcessor: isProcessor,
            isSubmitter: isSubmitter,
          },
        }
      )
    client.close()

    response.status(200).json({ account: updatedAccount })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

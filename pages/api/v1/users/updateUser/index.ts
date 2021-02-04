import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

/**
 *
 * This endpoint is not finished
 *
 */

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { newAccountInformation } = request.body
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database } = await connect()

  try {
    const email = JsonWebToken.verify(accessToken, process.env.WEBTOKEN_SECRET)
    const accountThatCalledApi = await database
      .collection('dotts_accounts')
      .findOne({
        email: email,
      })

    if (!accountThatCalledApi.isAdmin && !accountThatCalledApi.isPackIssuer) {
      response
        .status(200)
        .json({ error: 'User not permitted to update other accounts' })
      return
    }

    const updatedAccount = await database
      .collection('dotts_accounts')
      .findOneAndUpdate(
        {
          email: email,
        },
        { $set: {} }
      )

    response.status(200).json({ account: updatedAccount })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

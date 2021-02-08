import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import JsonWebToken from 'jsonwebtoken'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { packType } = request.body
  const accessToken = getAccessTokenFromHeader(request)
  if (accessToken == null) {
    response.status(200).json({ error: 'User not authenticated' })
    return
  }

  const { database, client } = await connect()

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

    let incrementQuery = {}
    if (packType === 'regular') {
      incrementQuery = {
        ownedRegularPacks: 1,
      }
    } else if (packType === 'ultimus') {
      incrementQuery = {
        ownedUltimusPacks: 1,
      }
    } else {
      response.status(200).json({ error: 'Invalid pack type' })
      return
    }

    const result = await database.collection('dotts_accounts').updateMany(
      {
        isSubscribed: true,
      },
      {
        $inc: incrementQuery,
      }
    )
    client.close()

    response.status(200).json({ result: result })
  } catch (error) {
    response.status(200).json({ error: error })
  }

  return
}

export default index

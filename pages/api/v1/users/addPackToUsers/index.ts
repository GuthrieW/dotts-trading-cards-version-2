import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import { ObjectId } from 'mongodb'
import JsonWebToken from 'jsonwebtoken'
import _ from 'lodash'
import { getAccessTokenFromHeader } from '../../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { packType, selectedUsers } = request.body
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

    console.log('selectedUsers', selectedUsers)

    let objectIds = []
    _.forEach(selectedUsers, (userId) => {
      console.log(userId._id)
      objectIds.push(new ObjectId(userId._id))
    })

    console.log('userIds', objectIds)

    const result = await database.collection('dotts_accounts').updateMany(
      {
        _id: { $in: objectIds },
      },
      {
        $inc: incrementQuery,
      }
    )
    client.close()

    console.log(result)

    response.status(200).json({ result: result })
  } catch (error) {
    response.status(200).json({ error: error })
  }
}

export default index

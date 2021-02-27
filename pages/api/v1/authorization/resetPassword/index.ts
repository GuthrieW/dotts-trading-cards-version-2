import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import bcrypt from 'bcrypt'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { resetToken, password } = request.body

  const databaseResetToken = await database
    .collection('dotts_reset_tokens')
    .findOne({
      resetToken: resetToken,
    })

  if (databaseResetToken == null) {
    response.status(200).json({
      error: `The link you are trying to use is invalid. Please get at new one here - `,
      link: `${window.location.host}/Authentication/ForgotPassword`,
    })
    return
  }

  if (
    Date.parse(databaseResetToken.expirationDate) <
    Date.parse(new Date().toString())
  )
    if (databaseResetToken.expirationDate > new Date()) {
      response.status(200).json({
        error: `The link you are trying to use has expired. Please get at new one here - `,
        link: `${window.location.host}/Authentication/ForgotPassword`,
      })
      return
    }

  if (databaseResetToken.used) {
    response.status(200).json({
      error: `The link you are trying to use has already been used once. Please get at new one here - `,
      link: `${window.location.host}/Authentication/ForgotPassword`,
    })
    return
  }

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)
  const updatedAccount = await database
    .collection('dotts_accounts')
    .findOneAndUpdate(
      {
        email: databaseResetToken.email,
      },
      {
        $set: {
          password: hashedPassword,
        },
      },
      {
        returnOriginal: false,
      }
    )
  const updatedDatabaseResetToken = await database
    .collection('dotts_reset_tokens')
    .findOneAndUpdate(
      {
        resetToken: resetToken,
      },
      {
        $set: {
          used: true,
        },
      },
      {
        returnOriginal: false,
      }
    )
  client.close()

  response.status(200).json({ success: 'success' })
}

export default index

import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import bcrypt from 'bcrypt'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database } = await connect()
  const { resetToken, password } = request.body

  const databaseResetToken = await database
    .collection('dotts_reset_tokens')
    .findOneAndUpdate(
      {
        resetToken: resetToken,
      },
      {
        used: true,
      },
      {
        returnOriginal: false,
      }
    )

  console.log(databaseResetToken)
  if (databaseResetToken == null) {
    response.status(200).json({ success: 'success' })
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
        password: hashedPassword,
      },
      {
        returnOriginal: false,
      }
    )
  response.status(200).json({ success: 'success' })
}

export default index

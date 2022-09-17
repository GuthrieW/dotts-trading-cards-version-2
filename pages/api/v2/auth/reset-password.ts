import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import bcrypt from 'bcryptjs'
import { Methods, TableNames } from '../common'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const { resetToken, password } = body
    const { database, client } = await connect()

    try {
      const resetTokenData = await database
        .collection(TableNames.DOTTS_RESET_TOKENS)
        .findOne({
          resetToken,
        })

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOneAndUpdate(
          { email: resetTokenData.email },
          { password: hashedPassword }
        )

      response.status(200).json({})
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }

  response.status(400).json({ error: 'Method Not Allowed' })
  return
}

export default index

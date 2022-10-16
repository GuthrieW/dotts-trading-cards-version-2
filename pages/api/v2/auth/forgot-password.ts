import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../..//database/database'
import NodeMailer from 'nodemailer'
import CryptoRandomString from 'crypto-random-string'
import { Methods, TableNames } from '../common'
import { add } from 'date-fns'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const { email } = body
    const { database, client } = await connect()
    try {
      const account = await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .findOne({
          email: email,
        })

      if (!account) {
        response
          .status(200)
          .json({ error: `No account exists with email ${email}` })
        return
      }

      const generatedRandomString = CryptoRandomString({
        length: 64,
        type: 'url-safe',
      })
      const passwordResetLink = `https://www.dottstradingcards.com/Authentication/PasswordReset?resetToken=${generatedRandomString}`
      const expirationDate = add(new Date(), { days: 1 })

      await database.collection(TableNames.DOTTS_RESET_TOKENS).insertOne({
        resetToken: generatedRandomString,
        expirationDate: expirationDate.toISOString(),
        email: email,
        used: false,
      })

      const transporter = NodeMailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
          user: process.env.DOTTS_EMAIL_USER,
          pass: process.env.DOTTS_EMAIL_PASSWORD,
        },
      })

      transporter.verify().then(console.log).catch(console.error)

      const emailOptions = {
        from: process.env.DOTTS_EMAIL_USER,
        to: email,
        subject: `Request to change ${account.isflUsername} Dotts password`,
        html: `<img src="https://media.discordapp.net/attachments/719409500292907029/720056809951461416/Dotts-Logo-red-black.png" width="400" height="280" />
        <p>Hey ${account.isflUsername},</p>
        <p>We received a request to change your password on Dotts Trading Cards</p>
        <p>Click <a href="${passwordResetLink}">here</a> to change your password. This link is valid for exactly one day.
        <p>If you did not request a password change you can ignore this message and continue to use your current password.</p>
        <p>Thanks,</p>
        <p>from your friends at Dotts Trading Cards</p>`,
      }

      transporter.sendMail(emailOptions, (error, info) => {
        if (error) {
          console.log(error)
        } else {
          console.log('Email sent: ' + info.response)
        }
      })

      response.status(200).json({ success: 'success' })
      return
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

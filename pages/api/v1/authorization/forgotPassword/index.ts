import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import NodeMailer from 'nodemailer'
import CryptoRandomString from 'crypto-random-string'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { email } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    email: email,
  })

  if (account == null) {
    response.status(200).json({ success: 'success' })
    return
  }

  const generatedRandomString = CryptoRandomString({
    length: 64,
    type: 'url-safe',
  })
  const passwordResetLink = `${window.location.host}/Authentication/PasswordReset?resetToken=${generatedRandomString}`
  let expirationDate = new Date()
  expirationDate.setDate(expirationDate.getDate() + 1)

  const insertedResetToken = await database
    .collection('dotts_reset_tokens')
    .insertOne({
      resetToken: generatedRandomString,
      expirationDate: expirationDate.toISOString(),
      email: email,
      used: false,
    })

  client.close()

  const transporter = NodeMailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.DOTTS_EMAIL_USER,
      pass: process.env.DOTTS_EMAIL_PASSWORD,
    },
  })

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
}

export default index

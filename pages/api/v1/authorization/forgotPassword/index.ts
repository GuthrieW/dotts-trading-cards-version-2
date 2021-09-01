import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../../database/database'
import NodeMailer from 'nodemailer'
import CryptoRandomString from 'crypto-random-string'
import SendGrid from '@sendgrid/mail'

const index = async (request: NextApiRequest, response: NextApiResponse) => {
  const { database, client } = await connect()
  const { email } = request.body

  const account = await database.collection('dotts_accounts').findOne({
    email: email,
  })

  if (account == null) {
    response.status(200).json({ failure: 'email does not exist' })
    return
  }

  const generatedRandomString = CryptoRandomString({
    length: 64,
    type: 'url-safe',
  })
  const passwordResetLink = `https://www.dottstradingcards.com/Authentication/PasswordReset?resetToken=${generatedRandomString}`
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

  SendGrid.setApiKey(process.env.SENDGRID_API_KEY)
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

  SendGrid.send(emailOptions)
    .then((response) => {
      console.log(response[0].statusCode)
      console.log(response[0].headers)
    })
    .catch((error) => {
      console.log(error)
    })

  // const transporter = NodeMailer.createTransport({
  //   service: 'SendGrid',
  //   auth: {
  //     user: process.env.DOTTS_EMAIL_USER,
  //     pass: process.env.DOTTS_EMAIL_PASSWORD,
  //   },
  // })

  // transporter.sendMail(emailOptions, (error, info) => {
  //   if (error) {
  //     console.log(error)
  //   } else {
  //     console.log('Email sent: ' + info.response)
  //   }
  // })

  response.status(200).json({ success: { expirationDate } })
  return
}

export default index

import { Db } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next'
import { connect } from '../../database/database'
import { Methods, TableNames } from '../common'
import NodeMailer, { Transporter } from 'nodemailer'

export const handler = async (
  request: NextApiRequest,
  response: NextApiResponse
) => {
  const { method, body } = request

  if (method === Methods.POST) {
    const { database, client } = await connect()

    try {
      if (body.errors && Array.isArray(body.errors) && body.errors.length > 0) {
        await sendSubscriptionErrorEmail(body.errors, database)
      }

      if (!body.successful || !Array.isArray(body.successful)) {
        response
          .status(400)
          .send('Expected array of usernames in "successful" attribute.')
        return
      }

      await database
        .collection(TableNames.DOTTS_ACCOUNTS)
        .updateMany(
          { isflUsername: { $in: body.successful } },
          { $inc: { ownedRegularPacks: 1 } }
        )

      response.status(200).json({ packIssued: true })
      return
    } catch (error) {
      console.log(error)
      response.status(400).json({ error })
    } finally {
      client.close()
      return
    }
  }
}

const sendSubscriptionErrorEmail = async (errors: string[], database: Db) => {
  const transporter: Transporter = NodeMailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
      user: process.env.DOTTS_EMAIL_USER,
      pass: process.env.DOTTS_EMAIL_PASSWORD,
    },
  })

  await new Promise((resolve, reject) => {
    transporter.verify(function (error, success) {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        console.log('Server is ready to take our messages')
        resolve(success)
      }
    })
  })

  // @ts-ignore
  const users = (await database
    .collection(TableNames.DOTTS_ACCOUNTS)
    .find({
      isflUsername: { $in: errors },
    })
    .toArray()) as DottsAccount[]

  await database
    .collection(TableNames.DOTTS_ACCOUNTS)
    .updateMany(
      { isflUsername: { $in: errors } },
      { $set: { isSubscribed: false } }
    )

  await Promise.all(
    await users.map(async (user) => {
      const emailOptions = {
        from: process.env.DOTTS_EMAIL_USER,
        to: user.email,
        subject: `Dotts Subscription Cancelled`,
        html: `<img src="https://media.discordapp.net/attachments/719409500292907029/720056809951461416/Dotts-Logo-red-black.png" width="400" height="280" />
      <p>Hey ${user.isflUsername},</p>
      <p>While distributing your Dotts Trading Cards subscription packs a username error was found.</p>
      <p>This can occur if you change your ISFL username to be different from your Dotts username or if you have insufficient funds in your bank.</p>
      <p>In order to renew your subscription, please contact caltroit_red_flames.</p>
      <p>Thanks,</p>
      <p>from your friends at Dotts Trading Cards</p>
    `,
      }

      await new Promise((resolve, reject) => {
        // send mail
        transporter.sendMail(emailOptions, (err, info) => {
          if (err) {
            console.error(err)
            reject(err)
          } else {
            console.log(info)
            resolve(info)
          }
        })
      })
    })
  )
}

export default handler

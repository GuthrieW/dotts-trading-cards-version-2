import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  database: {
    type: 'mongodb',
    useNewUrlParser: true,
    url: process.env.DATABASE_CONNECTION,
  },
}

const index = (request: NextApiRequest, response: NextApiResponse) => {
  NextAuth(request, response, options)
}

export default index

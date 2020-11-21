import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import { NextApiRequest, NextApiResponse } from 'next'
import { Provider } from 'react'

const index = (request: NextApiRequest, response: NextApiResponse) => {
  return NextAuth(request, response, options)
}

const options = {
  providers: [
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  database: process.env.DATABASE_CONNECTION,
}

export default index

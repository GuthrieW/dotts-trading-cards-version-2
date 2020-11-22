import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'

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

export default (req, res) => NextAuth(req, res, options)

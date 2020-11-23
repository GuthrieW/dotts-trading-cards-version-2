import { MongoClient } from 'mongodb'

const client = new MongoClient(process.env.DATABASE_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export async function connect() {
  if (!client.isConnected()) {
    await client.connect()
  }

  const database = client.db('nsfl_trading_cards')
  return { database, client }
}

export async function disconnect() {
  client.close()
}

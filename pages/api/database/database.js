import { MongoClient } from 'mongodb'

export async function connect() {
  const client = new MongoClient(process.env.DATABASE_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  if (!client.isConnected()) {
    await client.connect()
  }

  //const database = client.db('dotts_testing')
  const database = client.db('nsfl_trading_cards')
  return { database, client }
}

export async function disconnect() {
  client.close()
}

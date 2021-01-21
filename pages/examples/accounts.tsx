import React from 'react'
import { useQuery } from 'react-query'
import axios from 'axios'
import { API_URL } from '../../utils/constants'

function useAccounts() {
  return useQuery('accounts', async () => {
    const { data } = await axios.get(`${API_URL}/api/v1/user/`)
    return data
  })
}

const accounts = () => {
  const { status, data, error, isFetching } = useAccounts()

  return (
    <>
      {isFetching && <h1>Loading...</h1>}
      {error && <h1>Error</h1>}

      {!isFetching &&
        !error &&
        data.map((account) => (
          <>
            <h1>{account.userId}</h1>
            <ul>
              <li>providerId: {account.providerId}</li>
              <li>createdAt: {account.createdAt}</li>
            </ul>
          </>
        ))}
    </>
  )
}

export default accounts

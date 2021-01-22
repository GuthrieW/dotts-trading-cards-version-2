import React from 'react'
import { useQuery } from 'react-query'
import { DOTTS_USER_ID_STORAGE, API_URL } from '../../utils/constants'
import axios from 'axios'

function useCurrentUserAccount(userId) {
  return useQuery('collection', async () => {
    const { data } = await axios({
      method: 'post',
      url: `${API_URL}/api/v1/users/singleUser`,
      data: {
        userId: userId,
      },
    })

    return data
  })
}

const index = () => {
  const { status, data, error, isFetching } = useCurrentUserAccount(
    localStorage.getItem(DOTTS_USER_ID_STORAGE)
  )

  return (
    <>
      {isFetching && (
        <>
          <h1>Loading...</h1>
        </>
      )}

      {!isFetching && <pre>{JSON.stringify(data, null, 2)}</pre>}
    </>
  )
}

export default index

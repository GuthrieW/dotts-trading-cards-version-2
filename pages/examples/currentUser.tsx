import React from 'react'
import { useQuery } from 'react-query'
import { DOTTS_USER_ID_STORAGE } from '../../utils/constants'
import axios from 'axios'

function useCollection(userId) {
  return useQuery('collection', async () => {
    const { data } = await axios.get(
      `http://localhost:3000/api/v1/currentUser/${userId}`
    )
    return data
  })
}

const index = () => {
  const { status, data, error, isFetching } = useCollection(
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

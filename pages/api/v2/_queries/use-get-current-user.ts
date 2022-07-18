import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetCurrentUserRequest = {}

type UseGetCurrentUser = {
  currentUser: any
  isFetching: boolean
  error: any
}

export const UseGetCurrentUserKey = 'use-get-current-user-key'

const useGetCurrentUser = ({}: UseGetCurrentUserRequest): UseGetCurrentUser => {
  const { data, error, isFetching } = useQuery(
    UseGetCurrentUserKey,
    async () => {
      return await axios({
        method: 'get',
        url: '',
      })
    }
  )

  return {
    currentUser: data.data,
    isFetching,
    error,
  }
}

export default useGetCurrentUser

import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UseGetCurrentUserRequest = {}

type UseGetCurrentUser = {
  currentUser: DottsAccount
  isFetching: boolean
  error: any
}

export const UseGetCurrentUserKey = 'use-get-current-user-key'

const useGetCurrentUser = ({}: UseGetCurrentUserRequest): UseGetCurrentUser => {
  const { data, error, isFetching } = useQuery(
    UseGetCurrentUserKey,
    async () => {
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'get',
        url: '/api/v2/users/current',
      })
    }
  )

  return {
    currentUser: data?.data?.currentUser,
    isFetching,
    error,
  }
}

export default useGetCurrentUser

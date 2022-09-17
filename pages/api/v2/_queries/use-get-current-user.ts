import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

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
        method: Methods.GET,
        url: '/api/v2/users/current',
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting user')
      },
    }
  )

  return {
    currentUser: data?.data?.currentUser,
    isFetching,
    error,
  }
}

export default useGetCurrentUser

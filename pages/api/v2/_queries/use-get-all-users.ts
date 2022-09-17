import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetAllUsersRequest = {}

type UseGetAllUsers = {
  allUsers: any[]
  isFetching: boolean
  error: any
}

export const UseGetAllUsersKeys = 'use-get-all-users-key'

const useGetAllUsers = ({}: UseGetAllUsersRequest): UseGetAllUsers => {
  const { data, error, isFetching } = useQuery(
    UseGetAllUsersKeys,
    async () => {
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: '/api/v2/users',
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting all users')
      },
    }
  )

  return {
    allUsers: data?.data?.accounts || [],
    isFetching,
    error,
  }
}

export default useGetAllUsers

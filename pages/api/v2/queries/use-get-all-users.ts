import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetAllUsersRequest = {}

type UseGetAllUsers = {
  allUsers: any
  isFetching: boolean
  error: any
}

export const UseGetAllUsersKeys = 'use-get-all-users-key'

const useGetAllUsers = ({}: UseGetAllUsersRequest): UseGetAllUsers => {
  const { data, error, isFetching } = useQuery(UseGetAllUsersKeys, async () => {
    return await axios({
      method: 'get',
      url: '',
    })
  })

  return {
    allUsers: data.data,
    isFetching,
    error,
  }
}

export default useGetAllUsers

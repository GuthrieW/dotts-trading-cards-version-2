import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

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
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
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

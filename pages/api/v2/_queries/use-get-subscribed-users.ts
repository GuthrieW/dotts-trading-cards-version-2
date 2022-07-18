import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetSubscribedUsersRequest = {}

type UseGetSubscribedUsers = {
  subscribedUsers: any
  isFetching: boolean
  error: any
}

export const UseGetSubscribedUsersKey = 'use-get-subscribed-users-key'

const useGetSubscribedUsers =
  ({}: UseGetSubscribedUsersRequest): UseGetSubscribedUsers => {
    const { data, error, isFetching } = useQuery(
      UseGetSubscribedUsersKey,
      async () => {
        return await axios({
          method: 'get',
          url: '',
        })
      }
    )

    return {
      subscribedUsers: data.data,
      isFetching,
      error,
    }
  }

export default useGetSubscribedUsers

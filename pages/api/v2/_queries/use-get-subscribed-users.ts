import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

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
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: Methods.GET,
          url: '',
        })
      },
      {
        onSuccess: () => {},
        onError: () => {
          toast.error('Error getting subscribers')
        },
      }
    )

    return {
      subscribedUsers: data.data,
      isFetching,
      error,
    }
  }

export default useGetSubscribedUsers

import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetCurrentUserTradesRequest = {}

type UseGetCurrentUserTrades = {
  trades: any[]
  isFetching: boolean
  error: any
}

export const UseGetCurrentUserTradesKey = 'use-get-current-user-trades-key'

const useGetUserTrades =
  ({}: UseGetCurrentUserTradesRequest): UseGetCurrentUserTrades => {
    const { data, error, isFetching } = useQuery(
      UseGetCurrentUserTradesKey,
      async () => {
        return await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: Methods.GET,
          url: `/api/v2/trades/current`,
        })
      },
      {
        onSuccess: () => {},
        onError: () => {
          toast.error('Error getting trades')
        },
      }
    )

    return {
      trades: data?.data?.trades || [],
      isFetching,
      error,
    }
  }

export default useGetUserTrades

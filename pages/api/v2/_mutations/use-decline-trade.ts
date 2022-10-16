import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetCurrentUserTradesKey } from '../_queries/use-get-current-user-trades'
import { UseGetTradeKey } from '../_queries/use-get-trade'

type UseDeclineTradeRequest = {
  _id: string
}

type UseDeclineTrade = {
  declineTrade: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useDeclineTrade = (): UseDeclineTrade => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ _id }: UseDeclineTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: `/api/v2/trades/decline`,
        data: { tradeId: _id },
      })
    },
    {
      onSuccess: () => {
        toast.success('Trade declined')
        queryClient.invalidateQueries(UseGetCurrentUserTradesKey)
        queryClient.invalidateQueries(UseGetTradeKey)
      },
      onError: () => {
        toast.error('Error declining trade')
      },
    }
  )

  return {
    declineTrade: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useDeclineTrade

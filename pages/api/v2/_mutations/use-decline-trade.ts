import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { TradeStatuses } from '../../../../utils/trade-statuses'

type UseDeclineTradeRequest = {
  tradeId: string
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
    ({ tradeId }: UseDeclineTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: `/api/v2/trades/${tradeId}`,
        data: { tradeStatus: TradeStatuses.Declined },
      })
    },
    {
      onSuccess: () => {
        toast.success('Trade declined')
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

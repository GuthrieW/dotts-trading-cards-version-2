import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseDeclineTradeRequest = {}

type UseDeclineTrade = {
  declineTrade: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useDeclineTrade = (): UseDeclineTrade => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({}: UseDeclineTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.DELETE,
        url: '',
        data: {},
      })
    },
    {
      onSuccess: () => {},
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

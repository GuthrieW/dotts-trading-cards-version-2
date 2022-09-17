import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseAcceptTradeRequest = {}

type UseAcceptTrade = {
  acceptTrade: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useAcceptTrade = (): UseAcceptTrade => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({}: UseAcceptTradeRequest) => {
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
        toast.error('Error accepting trade')
      },
    }
  )

  return {
    acceptTrade: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useAcceptTrade

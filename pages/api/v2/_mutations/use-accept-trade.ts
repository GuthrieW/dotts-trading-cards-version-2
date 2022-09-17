import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseAcceptTradeRequest = {
  _id: string
  offeringUserId: string
  offeringUserCardIds: string[]
  receivingUserId: string
  receivingUserCardIds: string[]
}

type UseAcceptTrade = {
  acceptTrade: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useAcceptTrade = (): UseAcceptTrade => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({
      _id,
      offeringUserId,
      offeringUserCardIds,
      receivingUserId,
      receivingUserCardIds,
    }: UseAcceptTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: '/api/v2/trades/accept',
        data: {
          _id,
          offeringUserId,
          offeringUserCardIds,
          receivingUserId,
          receivingUserCardIds,
        },
      })
    },
    {
      onSuccess: () => {
        toast.success('Trade accepted')
      },
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

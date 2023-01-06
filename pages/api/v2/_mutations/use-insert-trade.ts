import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetCurrentUserTradesKey } from '../_queries/use-get-current-user-trades'

type UseInsertTradeRequest = {
  offeringUserId: string
  receivingUserId: string
  offeringUserCardIds: string[]
  receivingUserCardIds: string[]
}

type UseInsertTrade = {
  insertTrade: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useInsertTrade = (): UseInsertTrade => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({
      offeringUserId,
      receivingUserId,
      offeringUserCardIds,
      receivingUserCardIds,
    }: UseInsertTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/trades',
        data: {
          offeringUserId,
          receivingUserId,
          offeringUserCardIds,
          receivingUserCardIds,
        },
      })
    },
    {
      onSuccess: () => {
        toast.success('Trade created')
        queryClient.invalidateQueries(UseGetCurrentUserTradesKey)
      },
      onError: () => {
        toast.error('Error creating new trade')
      },
    }
  )

  return {
    insertTrade: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useInsertTrade

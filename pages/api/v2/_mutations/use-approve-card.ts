import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetAllCardsKey } from '../_queries/use-get-all-cards'
import { UseGetUnapprovedCardsKey } from '../_queries/use-get-unapproved-cards'

type UseApproveCardRequest = {
  _id: string
}

type UseApproveCard = {
  approveCard: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useApproveCard = (): UseApproveCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ _id }: UseApproveCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: `/api/v2/cards/approve/${_id}`,
        data: {},
      })
    },
    {
      onSuccess: () => {
        toast.success('Card approved')
        queryClient.invalidateQueries(UseGetAllCardsKey)
        queryClient.invalidateQueries(UseGetUnapprovedCardsKey)
      },
      onError: () => {
        toast.error('Error approving card')
      },
    }
  )

  return {
    approveCard: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useApproveCard

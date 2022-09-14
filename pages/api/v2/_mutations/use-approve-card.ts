import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseApproveCardRequest = {}

type UseApproveCard = {
  approveCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useApproveCard = (): UseApproveCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseApproveCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '',
        data: {},
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error approving card')
      },
    }
  )

  return {
    approveCard: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useApproveCard
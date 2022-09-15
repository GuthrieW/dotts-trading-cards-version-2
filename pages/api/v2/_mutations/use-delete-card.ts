import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseDeleteCardRequest = {
  _id: string
}

type UseDeleteCard = {
  deleteCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
  reset: Function
}

const useDeleteCard = (): UseDeleteCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error, reset } = useMutation(
    ({ _id }: UseDeleteCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.DELETE,
        url: `/api/v2/cards/delete/${_id}`,
        data: {},
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error deleting card')
      },
    }
  )

  return {
    deleteCard: mutate,
    isSuccess,
    isLoading,
    error,
    reset,
  }
}

export default useDeleteCard

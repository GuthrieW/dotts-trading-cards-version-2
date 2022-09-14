import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseDeleteCardRequest = {}

type UseDeleteCard = {
  deleteCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useDeleteCard = (): UseDeleteCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseDeleteCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.DELETE,
        url: '',
        data: {},
      })
    },
    { onSuccess: () => {}, onError: () => {} }
  )

  return {
    deleteCard: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useDeleteCard

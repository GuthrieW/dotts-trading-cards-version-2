import { useMutation } from 'react-query'
import axios from 'axios'

type UseDeleteCardRequest = {}

type UseDeleteCard = {
  deleteCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useDeleteCard = (): UseDeleteCard => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseDeleteCardRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    deleteCard: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useDeleteCard

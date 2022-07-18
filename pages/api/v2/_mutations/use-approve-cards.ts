import { useMutation } from 'react-query'
import axios from 'axios'

type UseApproveCardsRequest = {}

type UseApproveCards = {
  approveCards: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useApproveCards = (): UseApproveCards => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseApproveCardsRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    approveCards: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useApproveCards

import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseApproveCardRequest = {}

type UseApproveCard = {
  approveCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useApproveCard = (): UseApproveCard => {
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

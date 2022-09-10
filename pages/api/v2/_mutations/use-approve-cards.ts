import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

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
    approveCards: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useApproveCards

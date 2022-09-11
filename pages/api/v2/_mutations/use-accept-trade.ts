import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseAcceptTradeRequest = {}

type UseAcceptTrade = {
  acceptTrade: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useAcceptTrade = (): UseAcceptTrade => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseAcceptTradeRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.DELETE,
        url: '',
        data: {},
      })
    }
  )

  return {
    acceptTrade: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useAcceptTrade

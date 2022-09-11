import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseDeclineTradeRequest = {}

type UseDeclineTrade = {
  declineTrade: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useDeclineTrade = (): UseDeclineTrade => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseDeclineTradeRequest) => {
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
    declineTrade: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useDeclineTrade

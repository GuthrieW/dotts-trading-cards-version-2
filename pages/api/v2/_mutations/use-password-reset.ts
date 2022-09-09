import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UsePasswordResetRequest = {}

type UsePasswordReset = {
  passwordReset: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const usePasswordReset = (): UsePasswordReset => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UsePasswordResetRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    passwordReset: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default usePasswordReset

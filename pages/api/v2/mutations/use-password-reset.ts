import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

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

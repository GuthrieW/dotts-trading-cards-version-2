import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UsePasswordResetRequest = {}

type UsePasswordReset = {
  passwordReset: Function
  response: AxiosResponse
  isLoading: boolean
  isError: any
}

const usePasswordReset = (): UsePasswordReset => {
  const { mutate, data, error, isLoading } = useMutation(
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
    response: data.data,
    isLoading,
    isError: error,
  }
}

export default usePasswordReset

import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UseForgotPasswordRequest = {}

type UseForgotPassword = {
  forgotPassword: Function
  response: AxiosResponse
  isLoading: boolean
  isError: any
}

const useForgotPassword = (): UseForgotPassword => {
  const { mutate, data, error, isLoading } = useMutation(
    ({}: UseForgotPasswordRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    forgotPassword: mutate,
    response: data.data,
    isLoading,
    isError: error,
  }
}

export default useForgotPassword

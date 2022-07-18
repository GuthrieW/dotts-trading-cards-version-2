import { useMutation } from 'react-query'
import axios from 'axios'

type UseForgotPasswordRequest = {}

type UseForgotPassword = {
  forgotPassword: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useForgotPassword = (): UseForgotPassword => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
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
    isSuccess,
    isLoading,
    error,
  }
}

export default useForgotPassword

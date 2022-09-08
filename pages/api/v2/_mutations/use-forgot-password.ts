import { useMutation } from 'react-query'
import axios from 'axios'

type UseForgotPasswordRequest = {
  email: string
}

type UseForgotPassword = {
  forgotPassword: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useForgotPassword = (): UseForgotPassword => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({ email }: UseForgotPasswordRequest) => {
      return axios({
        method: 'post',
        url: '/api/v2/auth/forgot-password',
        data: { email },
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

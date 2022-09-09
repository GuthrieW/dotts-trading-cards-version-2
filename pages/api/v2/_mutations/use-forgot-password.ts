import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

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
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
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

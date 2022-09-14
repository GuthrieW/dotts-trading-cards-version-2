import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

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
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({ email }: UseForgotPasswordRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/auth/forgot-password',
        data: { email },
      })
    },
    { onSuccess: () => {}, onError: () => {} }
  )

  return {
    forgotPassword: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useForgotPassword

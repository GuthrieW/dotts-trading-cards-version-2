import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseAuthenticationKey } from '../_queries/use-authentication'

type UseLoginRequest = {
  email: string
  password: string
}

type UseLogin = {
  login: Function
  accessToken: string
  authenticationFailed: any
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useLogin = (): UseLogin => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, data, isSuccess, isLoading, reset } = useMutation(
    ({ email, password }: UseLoginRequest) => {
      return axios({
        method: Methods.POST,
        url: '/api/v2/auth/login',
        data: { email, password },
      })
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(UseAuthenticationKey)
      },
      onError: () => {
        toast.error('Error logging in')
      },
    }
  )

  return {
    login: mutate,
    accessToken: data?.data?.accessToken,
    authenticationFailed: data?.data?.error,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useLogin

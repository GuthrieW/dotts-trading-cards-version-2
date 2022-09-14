import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { Methods } from '../common'

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
  error: any
}

const useLogin = (): UseLogin => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, data, isSuccess, isLoading, error } = useMutation(
    ({ email, password }: UseLoginRequest) => {
      return axios({
        method: Methods.POST,
        url: '/api/v2/auth/login',
        data: { email, password },
      })
    },
    { onSuccess: () => {}, onError: () => {} }
  )

  return {
    login: mutate,
    accessToken: data?.data?.accessToken,
    authenticationFailed: data?.data?.error,
    isSuccess,
    isLoading,
    error,
  }
}

export default useLogin

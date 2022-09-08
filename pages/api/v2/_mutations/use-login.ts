import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { Methods } from '../common'

type UseLoginRequest = {
  email: string
  password: string
}

type UseLogin = {
  login: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useLogin = (): UseLogin => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({ email, password }: UseLoginRequest) => {
      return axios({
        method: Methods.POST,
        url: '/api/v2/auth/login',
        data: { email, password },
      })
    }
  )

  return {
    login: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useLogin

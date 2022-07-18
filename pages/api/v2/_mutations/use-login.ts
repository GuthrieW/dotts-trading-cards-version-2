import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

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
        method: 'post',
        url: '/api/v1/authorization/logIn',
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

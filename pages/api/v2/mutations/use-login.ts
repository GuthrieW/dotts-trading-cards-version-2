import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UseLoginRequest = {}

type UseLogin = {
  login: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useLogin = (): UseLogin => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseLoginRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
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

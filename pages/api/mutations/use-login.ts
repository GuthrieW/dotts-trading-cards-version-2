import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UseLoginRequest = {}

type UseLogin = {
  login: Function
  response: AxiosResponse
  isLoading: boolean
  isError: any
}

const useLogin = (): UseLogin => {
  const { mutate, data, error, isLoading } = useMutation(
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
    response: data.data,
    isLoading,
    isError: error,
  }
}

export default useLogin

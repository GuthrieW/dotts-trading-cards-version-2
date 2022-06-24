import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UseSignUpRequest = {}

type UseSignUp = {
  signUp: Function
  response: AxiosResponse
  isLoading: boolean
  isError: any
}

const useSignUp = (): UseSignUpRequest => {
  const { mutate, data, error, isLoading } = useMutation(({}: UseSignUp) => {
    return axios({
      method: 'post',
      url: '',
      data: {},
    })
  })

  return {
    signUp: mutate,
    response: data.data,
    isLoading,
    isError: error,
  }
}

export default useSignUp

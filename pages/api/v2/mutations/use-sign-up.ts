import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'

type UseSignUpRequest = {}

type UseSignUp = {
  signUp: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useSignUp = (): UseSignUp => {
  const { mutate, data, isSuccess, isLoading, error } = useMutation(
    ({}: UseSignUpRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    signUp: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useSignUp

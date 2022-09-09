import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UseSignUpRequest = {
  email: string
  username: string
  password: string
}

type UseSignUp = {
  signUp: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useSignUp = (): UseSignUp => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({ email, username, password }: UseSignUpRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: '/api/v2/auth/sign-up',
        data: {
          isflUsername: username,
          email,
          password,
        },
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

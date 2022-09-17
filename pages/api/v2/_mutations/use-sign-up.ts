import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseSignUpRequest = {
  email: string
  username: string
  password: string
}

type UseSignUp = {
  signUp: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useSignUp = (): UseSignUp => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ email, username, password }: UseSignUpRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PUT,
        url: '/api/v2/auth/sign-up',
        data: {
          isflUsername: username,
          email,
          password,
        },
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error signing up')
      },
    }
  )

  return {
    signUp: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useSignUp

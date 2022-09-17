import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UsePasswordResetRequest = {}

type UsePasswordReset = {
  passwordReset: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const usePasswordReset = (): UsePasswordReset => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({}: UsePasswordResetRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '',
        data: {},
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error resetting password')
      },
    }
  )

  return {
    passwordReset: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default usePasswordReset

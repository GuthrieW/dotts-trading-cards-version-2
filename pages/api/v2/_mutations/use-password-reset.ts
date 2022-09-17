import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetCurrentUserKey } from '../_queries/use-get-current-user'

type UsePasswordResetRequest = {
  password: string
  resetToken: string
}

type UsePasswordReset = {
  passwordReset: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const usePasswordReset = (): UsePasswordReset => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ resetToken, password }: UsePasswordResetRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/auth/reset-password',
        data: { resetToken, password },
      })
    },
    {
      onSuccess: () => {
        toast.success('Your password has been reset')
        queryClient.invalidateQueries(UseGetCurrentUserKey)
      },
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

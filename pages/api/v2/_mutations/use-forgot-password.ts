import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseForgotPasswordRequest = {
  email: string
}

type UseForgotPassword = {
  forgotPassword: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useForgotPassword = (): UseForgotPassword => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ email }: UseForgotPasswordRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/auth/forgot-password',
        data: { email },
      })
    },
    {
      onSuccess: () => {
        toast.success('A link has been sent to your email')
      },
      onError: () => {
        toast.error('Error creating reset token')
      },
    }
  )

  return {
    forgotPassword: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useForgotPassword

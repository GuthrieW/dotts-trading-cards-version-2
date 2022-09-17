import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseUpdateUserRequest = {
  _id: string
  ownedRegularPacks: number
  ownedUltimusPacks: number
  isAdmin: boolean
  isSubscribed: boolean
  isProcessor: boolean
  isPackIssuer: boolean
  isSubmitter: boolean
}

type UseUpdateUser = {
  updateUser: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useUpdateUser = (): UseUpdateUser => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({
      _id,
      ownedRegularPacks,
      ownedUltimusPacks,
      isAdmin,
      isSubscribed,
      isProcessor,
      isPackIssuer,
      isSubmitter,
    }: UseUpdateUserRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: `/api/v2/users/${_id}`,
        data: {
          ownedRegularPacks,
          ownedUltimusPacks,
          isAdmin,
          isSubscribed,
          isProcessor,
          isPackIssuer,
          isSubmitter,
        },
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error updating user')
      },
    }
  )

  return {
    updateUser: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useUpdateUser

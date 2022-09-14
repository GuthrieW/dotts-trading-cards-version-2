import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

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
  error: any
  reset: Function
}

const useUpdateUser = (): UseUpdateUser => {
  const { mutate, isSuccess, isLoading, error, reset } = useMutation(
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
        method: Methods.POST,
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
    }
  )

  return {
    updateUser: mutate,
    isSuccess,
    isLoading,
    error,
    reset,
  }
}

export default useUpdateUser

import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseUpdateUserRequest = {}

type UseUpdateUser = {
  updateUser: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useUpdateUser = (): UseUpdateUser => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseUpdateUserRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '',
        data: {},
      })
    }
  )

  return {
    updateUser: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useUpdateUser

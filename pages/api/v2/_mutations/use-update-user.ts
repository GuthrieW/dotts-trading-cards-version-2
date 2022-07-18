import { useMutation } from 'react-query'
import axios from 'axios'

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
        method: 'post',
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

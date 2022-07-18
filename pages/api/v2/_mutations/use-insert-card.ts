import { useMutation } from 'react-query'
import axios from 'axios'

type UseInsertCardRequest = {}

type UseInsertCard = {
  insertCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useInsertCard = (): UseInsertCard => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseInsertCardRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    insertCard: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useInsertCard

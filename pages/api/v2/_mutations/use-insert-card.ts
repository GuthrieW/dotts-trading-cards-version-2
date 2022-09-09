import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

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
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
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

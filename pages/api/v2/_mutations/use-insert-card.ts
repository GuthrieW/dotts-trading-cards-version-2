import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseInsertCardRequest = {}

type UseInsertCard = {
  insertCard: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useInsertCard = (): UseInsertCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseInsertCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '',
        data: {},
      })
    },
    { onSuccess: () => {}, onError: () => {} }
  )

  return {
    insertCard: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useInsertCard

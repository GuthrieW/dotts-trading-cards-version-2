import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

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
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error inserting new card')
      },
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

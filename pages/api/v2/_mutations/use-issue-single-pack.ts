import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseIssueSinglePackRequest = {
  _id: string
  packType: string
}

type UseIssueSinglePack = {
  issueSinglePack: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
  reset: Function
}

const useIssueSinglePack = (): UseIssueSinglePack => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error, reset } = useMutation(
    ({ _id, packType }: UseIssueSinglePackRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: `/api/v2/packs/issue/single/${_id}`,
        data: { packType },
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error issuing pack')
      },
    }
  )

  return {
    issueSinglePack: mutate,
    isSuccess,
    isLoading,
    error,
    reset,
  }
}

export default useIssueSinglePack

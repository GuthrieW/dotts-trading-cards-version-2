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
  reset: Function
}

const useIssueSinglePack = (): UseIssueSinglePack => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
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
      onSuccess: () => {
        toast.success('Pack issued')
      },
      onError: () => {
        toast.error('Error issuing pack')
      },
    }
  )

  return {
    issueSinglePack: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useIssueSinglePack

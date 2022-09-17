import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseOpenPackRequest = {
  packType: string
}

type UseOpenPack = {
  openPack: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useOpenPack = (): UseOpenPack => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ packType }: UseOpenPackRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/packs/open',
        data: { packType },
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error opening pack')
      },
    }
  )

  return {
    openPack: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useOpenPack

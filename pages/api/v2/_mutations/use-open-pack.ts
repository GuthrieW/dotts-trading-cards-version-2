import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseOpenPackRequest = {
  packType: string
}

type UseOpenPack = {
  openPack: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useOpenPack = (): UseOpenPack => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
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
    { onSuccess: () => {}, onError: () => {} }
  )

  return {
    openPack: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useOpenPack

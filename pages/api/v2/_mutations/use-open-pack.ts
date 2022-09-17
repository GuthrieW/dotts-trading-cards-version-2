import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetCurrentUserKey } from '../_queries/use-get-current-user'
import { UseGetCardsOwnedByUserKey } from '../_queries/use-get-cards-owned-by-user'
import { UseGetLastOpenedPackKey } from '../_queries/use-get-last-opened-pack'

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
      onSuccess: () => {
        toast.success('pack opened')
        queryClient.invalidateQueries(UseGetCurrentUserKey)
        queryClient.invalidateQueries(UseGetCardsOwnedByUserKey)
        queryClient.invalidateQueries(UseGetLastOpenedPackKey)
      },
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

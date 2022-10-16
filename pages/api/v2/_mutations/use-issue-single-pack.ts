import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetCurrentUserKey } from '../_queries/use-get-current-user'
import { UseGetCardsOwnedByUserKey } from '../_queries/use-get-cards-owned-by-user'
import { UseGetLastOpenedPackKey } from '../_queries/use-get-last-opened-pack'
import { UseGetAllUsersKey } from '../_queries/use-get-all-users'

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
        url: `/api/v2/packs/issue/${_id}`,
        data: { packType },
      })
    },
    {
      onSuccess: () => {
        toast.success('Pack issued')
        queryClient.invalidateQueries(UseGetCurrentUserKey)
        queryClient.invalidateQueries(UseGetAllUsersKey)
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

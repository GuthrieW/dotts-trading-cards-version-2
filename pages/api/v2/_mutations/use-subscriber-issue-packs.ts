import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseIssueSubscriberPacksRequest = {
  packType: string
}

type UseIssueSubscriberPacks = {
  issueSubscriberPacks: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useIssueSubscriberPacks = (): UseIssueSubscriberPacks => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ packType }: UseIssueSubscriberPacksRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/packs/issue/subscribers',
        data: { packType },
      })
    },
    {
      onSuccess: () => {
        toast.success('Subscriber packs issued')
      },
      onError: () => {
        toast.error('Error issuing packs')
      },
    }
  )

  return {
    issueSubscriberPacks: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useIssueSubscriberPacks

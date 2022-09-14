import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseIssuePacksRequest = {}

type UseIssuePacks = {
  issuePacks: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useIssuePacks = (): UseIssuePacks => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseIssuePacksRequest) => {
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
    issuePacks: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useIssuePacks

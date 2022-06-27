import { useMutation } from 'react-query'
import axios from 'axios'

type UseIssuePacksRequest = {}

type UseIssuePacks = {
  issuePacks: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useIssuePacks = (): UseIssuePacks => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseIssuePacksRequest) => {
      return axios({
        method: 'post',
        url: '',
        data: {},
      })
    }
  )

  return {
    issuePacks: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useIssuePacks

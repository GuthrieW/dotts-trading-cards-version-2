import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

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
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
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

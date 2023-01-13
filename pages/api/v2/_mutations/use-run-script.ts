import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseRunScriptRequest = {}

type UseRunScript = {
  runScript: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useRunScript = (): UseRunScript => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({}: UseRunScriptRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: `/api/v2/script`,
      })
    },
    {
      onSuccess: () => {
        toast.success('Script finished')
      },
      onError: () => {
        toast.error('Error running script')
      },
    }
  )

  return {
    runScript: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useRunScript

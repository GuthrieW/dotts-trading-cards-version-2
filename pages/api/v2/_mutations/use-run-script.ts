import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseRunScriptRequest = {
  scriptName: string
}

type UseRunScript = {
  runScript: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useRunScript = (): UseRunScript => {
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({ scriptName }: UseRunScriptRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: `/api/v2/script`,
        data: {
          scriptName,
        },
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

import { useMutation } from 'react-query'
import axios, { AxiosResponse } from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseOpenPackRequest = {}

type UseOpenPack = {
  openPack: Function
  isSuccess: boolean
  isLoading: boolean
  error: any
}

const useOpenPack = (): UseOpenPack => {
  const { mutate, isSuccess, isLoading, error } = useMutation(
    ({}: UseOpenPackRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '',
        data: {},
      })
    }
  )

  return {
    openPack: mutate,
    isSuccess,
    isLoading,
    error,
  }
}

export default useOpenPack

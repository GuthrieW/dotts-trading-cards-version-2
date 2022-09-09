import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UseGetLastOpenedPackRequest = {}

type UseGetLastOpenedPack = {
  lastOpenedPack: any[]
  isFetching: boolean
  error: any
}

export const UseGetLastOpenedPackKey = 'use-get-last-opened-pack-key'

const useGetLastOpenedPack =
  ({}: UseGetLastOpenedPackRequest): UseGetLastOpenedPack => {
    const { data, error, isFetching } = useQuery(
      UseGetLastOpenedPackKey,
      async () => {
        return await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: 'get',
          url: '',
        })
      }
    )

    return {
      lastOpenedPack: data.data,
      isFetching,
      error,
    }
  }

export default useGetLastOpenedPack

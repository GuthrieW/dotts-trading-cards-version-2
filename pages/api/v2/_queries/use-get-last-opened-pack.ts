import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

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
          method: Methods.GET,
          url: '/api/v2/cards/last-pack',
        })
      }
    )

    return {
      lastOpenedPack: data?.data?.lastOpenedPack || [],
      isFetching,
      error,
    }
  }

export default useGetLastOpenedPack

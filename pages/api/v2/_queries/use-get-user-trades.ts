import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UseGetUserTradesRequest = {}

type UseGetUserTrades = {
  userTrades: any[]
  isFetching: boolean
  error: any
}

export const UseGetUserTradesKey = 'use-get-user-trades-key'

const useGetUserTrades = ({}: UseGetUserTradesRequest): UseGetUserTrades => {
  const { data, error, isFetching } = useQuery(
    UseGetUserTradesKey,
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
    userTrades: data.data,
    isFetching,
    error,
  }
}

export default useGetUserTrades

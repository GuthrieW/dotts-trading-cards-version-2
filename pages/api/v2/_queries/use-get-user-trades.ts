import axios from 'axios'
import { useQuery } from 'react-query'

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

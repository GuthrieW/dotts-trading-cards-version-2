import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseGetTradeRequest = {
  id: string
}

type UseGetTrade = {
  trade: DottsTrade
  isFetching: boolean
  error: any
}

export const UseGetTradeKey = 'use-get-trade-key'

const useGetTrade = ({ id }: UseGetTradeRequest): UseGetTrade => {
  const { data, error, isFetching } = useQuery(UseGetTradeKey, async () => {
    return await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: Methods.GET,
      url: `/api/v2/trades/${id}`,
    })
  })

  return {
    trade: data?.data || null,
    isFetching,
    error,
  }
}

export default useGetTrade

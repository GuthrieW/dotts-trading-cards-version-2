import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetTradingPartnersRequest = {
  sendingUserId: string
  receivingUserId: string
}

type UseGetTradingPartners = {
  sendingUser: DottsAccount
  sendingUserCards: CardWithCount[]
  receivingUser: DottsAccount
  receivingUserCards: CardWithCount[]
  isFetching: boolean
  error: any
}

export const UseGetTradingPartnersKey = 'use-get-trading-partners-key'

const useGetTradingParners = ({
  sendingUserId,
  receivingUserId,
}: UseGetTradingPartnersRequest): UseGetTradingPartners => {
  const { data, error, isFetching } = useQuery(
    UseGetTradingPartnersKey,
    async () => {
      console.log('ids', sendingUserId, receivingUserId)
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/users/trade-partners',
        data: {
          sendingUserId,
          receivingUserId,
        },
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting trade partners')
      },
    }
  )

  return {
    sendingUser: data?.data?.sendingUser || {},
    sendingUserCards: data?.data?.sendingUserCards || [],
    receivingUser: data?.data?.receivingUser || {},
    receivingUserCards: data?.data?.receivingUserCards || [],
    isFetching,
    error,
  }
}

export default useGetTradingParners

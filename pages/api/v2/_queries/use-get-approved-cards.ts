import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseGetApprovedCardsRequest = {}

type UseGetApprovedCards = {
  approvedCards: any[]
  isFetching: boolean
  error: any
}

export const UseGetApprovedCardsKey = 'use-get-approved-cards-key'

const useGetApprovedCards =
  ({}: UseGetApprovedCardsRequest): UseGetApprovedCards => {
    const { data, error, isFetching } = useQuery(
      UseGetApprovedCardsKey,
      async () => {
        return await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: Methods.GET,
          url: '/api/v2/cards/approved',
        })
      },
      {
        onSuccess: () => {},
        onError: () => {
          toast.error('Error getting approved cards')
        },
      }
    )

    return {
      approvedCards: data?.data?.approvedCards || [],
      isFetching,
      error,
    }
  }

export default useGetApprovedCards

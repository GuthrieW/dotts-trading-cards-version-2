import axios from 'axios'
import { useQuery } from 'react-query'
import { toast } from 'react-toastify'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseGetUnapprovedCardsRequest = {}

type UseGetUnapprovedCards = {
  unapprovedCards: any
  isFetching: boolean
  error: any
}

export const UseGetUnapprovedCardsKey = 'use-get-unapproved-cards-key'

const useGetUnapprovedCards =
  ({}: UseGetUnapprovedCardsRequest): UseGetUnapprovedCards => {
    const { data, error, isFetching } = useQuery(
      UseGetUnapprovedCardsKey,
      async () => {
        return await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: Methods.GET,
          url: '/api/v2/cards/unapproved',
        })
      },
      {
        onSuccess: () => {},
        onError: () => {
          toast.error('Error getting unapproved cards')
        },
      }
    )

    return {
      unapprovedCards: data?.data?.unapprovedCards || [],
      isFetching,
      error,
    }
  }

export default useGetUnapprovedCards

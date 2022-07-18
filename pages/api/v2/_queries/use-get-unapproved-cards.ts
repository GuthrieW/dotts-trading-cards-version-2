import axios from 'axios'
import { useQuery } from 'react-query'

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
          method: 'get',
          url: '',
        })
      }
    )

    return {
      unapprovedCards: data.data,
      isFetching,
      error,
    }
  }

export default useGetUnapprovedCards

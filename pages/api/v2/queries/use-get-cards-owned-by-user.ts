import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetCardsOwnedByUserRequest = {}

type UseGetCardsOwnedByUser = {
  cardsOwnedByUser: any
  isFetching: boolean
  error: any
}

export const UseGetCardOwnersKeys = 'use-get-card-owners-key'

const useGetCardsOwnedByUser =
  ({}: UseGetCardsOwnedByUserRequest): UseGetCardsOwnedByUser => {
    const { data, error, isFetching } = useQuery(
      UseGetCardOwnersKeys,
      async () => {
        return await axios({
          method: 'get',
          url: '',
        })
      }
    )

    return {
      cardsOwnedByUser: data.data,
      isFetching,
      error,
    }
  }

export default useGetCardsOwnedByUser

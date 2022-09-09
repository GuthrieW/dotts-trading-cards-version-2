import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

type UseGetCardsOwnedByUserRequest = {}

type UseGetCardsOwnedByUser = {
  cardsOwnedByUser: any
  isFetching: boolean
  error: any
}

export const UseGetCardsOwnedByUserKey = 'use-get-cards-owned-by-user-key'

const useGetCardsOwnedByUser =
  ({}: UseGetCardsOwnedByUserRequest): UseGetCardsOwnedByUser => {
    const { data, error, isFetching } = useQuery(
      UseGetCardsOwnedByUserKey,
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
      cardsOwnedByUser: data.data,
      isFetching,
      error,
    }
  }

export default useGetCardsOwnedByUser

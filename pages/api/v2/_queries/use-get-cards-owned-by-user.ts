import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseGetCardsOwnedByUserRequest = {
  id: string
}

type UseGetCardsOwnedByUser = {
  cardsOwnedByUser: any
  isFetching: boolean
  error: any
}

export const UseGetCardsOwnedByUserKey = 'use-get-cards-owned-by-user-key'

const useGetCardsOwnedByUser = ({
  id,
}: UseGetCardsOwnedByUserRequest): UseGetCardsOwnedByUser => {
  const { data, error, isFetching } = useQuery(
    UseGetCardsOwnedByUserKey,
    async () => {
      console.log('query user', id)
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: `/api/v2/users/collection/${id}`,
      })
    }
  )

  console.log(data)

  return {
    cardsOwnedByUser: data?.data?.cardsOwnedByUser ?? [],
    isFetching,
    error,
  }
}

export default useGetCardsOwnedByUser

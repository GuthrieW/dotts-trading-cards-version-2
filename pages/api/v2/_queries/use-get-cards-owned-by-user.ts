import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetCardsOwnedByUserRequest = {
  id: string
}

type UseGetCardsOwnedByUser = {
  isflUsername: string
  cardsOwnedByUser: CardWithCount[]
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
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: `/api/v2/users/collection/${id}`,
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting cards')
      },
    }
  )

  return {
    isflUsername: data?.data?.isflUsername || '',
    cardsOwnedByUser: data?.data?.cardsOwnedByUser || [],
    isFetching,
    error,
  }
}

export default useGetCardsOwnedByUser

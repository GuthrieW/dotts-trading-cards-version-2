import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetAllCardsRequest = {}

type UseGetAllCards = {
  allCards: any[]
  isFetching: boolean
  error: any
}

export const UseGetAllCardsKeys = 'use-get-all-cards-key'

const useGetAllCards = ({}: UseGetAllCardsRequest): UseGetAllCards => {
  const { data, error, isFetching } = useQuery(
    UseGetAllCardsKeys,
    async () => {
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: '/api/v2/cards/all',
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting all cards')
      },
    }
  )

  return {
    allCards: data?.data?.allCards ?? [],
    isFetching,
    error,
  }
}

export default useGetAllCards

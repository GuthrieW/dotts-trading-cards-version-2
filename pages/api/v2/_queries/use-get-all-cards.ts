import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetAllCardsRequest = {}

type UseGetAllCards = {
  allCards: any
  isFetching: boolean
  error: any
}

export const UseGetAllCardsKeys = 'use-get-all-cards-key'

const useGetAllCards = ({}: UseGetAllCardsRequest): UseGetAllCards => {
  const { data, error, isFetching } = useQuery(UseGetAllCardsKeys, async () => {
    return await axios({
      method: 'get',
      url: '',
    })
  })

  return {
    allCards: data.data,
    isFetching,
    error,
  }
}

export default useGetAllCards

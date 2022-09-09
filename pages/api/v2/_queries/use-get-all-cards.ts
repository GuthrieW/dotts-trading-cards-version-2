import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'

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
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
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

import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetCardOwnersRequest = {}

type UseGetCardOwners = {
  cardOwners: any
  isFetching: boolean
  isError: any
}

export const UseGetCardOwnersKeys = 'use-get-card-owners-key'

const useGetAllCards = ({}: UseGetCardOwnersRequest): UseGetCardOwners => {
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
    cardOwners: data.data,
    isFetching,
    isError: error,
  }
}

export default useGetAllCards

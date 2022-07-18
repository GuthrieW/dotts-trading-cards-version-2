import axios from 'axios'
import { useQuery } from 'react-query'

type UseGetCardOwnersRequest = {}

type UseGetCardOwners = {
  cardOwners: any
  isFetching: boolean
  error: any
}

export const UseGetCardOwnersKeys = 'use-get-card-owners-key'

const useGetAllCardOwners = ({}: UseGetCardOwnersRequest): UseGetCardOwners => {
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
    error,
  }
}

export default useGetAllCardOwners

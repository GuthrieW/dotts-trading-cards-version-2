import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseGetCardOwnersRequest = {}

type UseGetCardOwners = {
  cardOwners: any
  isFetching: boolean
  error: any
}

export const UseGetCardOwnersKey = 'use-get-card-owners-key'

const useGetAllCardOwners = ({}: UseGetCardOwnersRequest): UseGetCardOwners => {
  const { data, error, isFetching } = useQuery(
    UseGetCardOwnersKey,
    async () => {
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: '',
      })
    },
    {
      onSuccess: () => {},
      onError: () => {
        toast.error('Error getting card owners')
      },
    }
  )

  return {
    cardOwners: data.data,
    isFetching,
    error,
  }
}

export default useGetAllCardOwners

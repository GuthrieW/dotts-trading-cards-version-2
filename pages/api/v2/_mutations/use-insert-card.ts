import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetAllCardsKey } from '../_queries/use-get-all-cards'

type UseInsertCardRequest = {
  imageUrl: string
  playerName: string
  playerTeam: string
  rarity: string
  submissionUsername: string
}

type UseInsertCard = {
  insertCard: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useInsertCard = (): UseInsertCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({
      imageUrl,
      playerName,
      playerTeam,
      rarity,
      submissionUsername,
    }: UseInsertCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: '/api/v2/cards',
        data: {
          imageUrl,
          playerName,
          playerTeam,
          rarity,
          submissionUsername,
        },
      })
    },
    {
      onSuccess: () => {
        toast.success('Card created')
        queryClient.invalidateQueries(UseGetAllCardsKey)
      },
      onError: () => {
        toast.error('Error inserting new card')
      },
    }
  )

  return {
    insertCard: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useInsertCard

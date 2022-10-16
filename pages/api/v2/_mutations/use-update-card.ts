import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'
import { UseGetAllCardsKey } from '../_queries/use-get-all-cards'
import { UseGetCardsOwnedByUserKey } from '../_queries/use-get-cards-owned-by-user'
import { UseGetUnapprovedCardsKey } from '../_queries/use-get-unapproved-cards'

type UseUpdateCardRequest = {
  _id: string
  approved: boolean
  currentRotation: boolean
  imageUrl: string
  playerName: string
  playerTeam: string
  rarity: string
}

type UseUpdateCard = {
  updateCard: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useUpdateCard = (): UseUpdateCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, reset } = useMutation(
    ({
      _id,
      approved,
      currentRotation,
      imageUrl,
      playerName,
      playerTeam,
      rarity,
    }: UseUpdateCardRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.PATCH,
        url: `/api/v2/cards/${_id}`,
        data: {
          approved,
          currentRotation,
          imageUrl,
          playerName,
          playerTeam,
          rarity,
        },
      })
    },
    {
      onSuccess: () => {
        toast.success('Card updated')
        queryClient.invalidateQueries(UseGetAllCardsKey)
        queryClient.invalidateQueries(UseGetCardsOwnedByUserKey)
        queryClient.invalidateQueries(UseGetUnapprovedCardsKey)
      },
      onError: () => {
        toast.error('Error updating card')
      },
    }
  )

  return {
    updateCard: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useUpdateCard

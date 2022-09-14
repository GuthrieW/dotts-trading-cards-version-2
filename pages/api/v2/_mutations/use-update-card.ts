import { QueryClient, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

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
  error: any
  reset: Function
}

const useUpdateCard = (): UseUpdateCard => {
  const queryClient: QueryClient = useQueryClient()
  const { mutate, isSuccess, isLoading, error, reset } = useMutation(
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
        method: Methods.POST,
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
      onSuccess: () => {},
      onError: () => {
        toast.error('Error updating user')
      },
    }
  )

  return {
    updateCard: mutate,
    isSuccess,
    isLoading,
    error,
    reset,
  }
}

export default useUpdateCard

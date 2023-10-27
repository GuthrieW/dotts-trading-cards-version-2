import { useMutation } from 'react-query'
import axios from 'axios'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type UseRunScriptRequest = {
  scriptName: string
}

type UseRunScript = {
  runScript: Function
  isSuccess: boolean
  isLoading: boolean
  reset: Function
}

const useRunScript = (): UseRunScript => {
  const { mutate, isSuccess, isLoading, reset, data } = useMutation(
    ({ scriptName }: UseRunScriptRequest) => {
      return axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.POST,
        url: `/api/v2/script`,
        data: {
          scriptName,
        },
      })
    },
    {
      onSuccess: () => {
        toast.success('Script finished')
      },
      onError: (error) => {
        console.log('error', error)
        toast.error('Error running script')
      },
    }
  )
  if (data) {
    console.log('data', data.data)

    const csvWithoutHeaders: string[] = data.data.map((card) => {
      return `${card._id},${card.imageUrl}`
    })

    csvWithoutHeaders.unshift('_id,old_image_url,new_image_url')
    const csv = csvWithoutHeaders.join('\n')

    const blob = new Blob(['\ufeff', csv], {
      type: 'text/csv;charset=utf-8;',
    })

    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = 'discordCards.csv'
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return {
    runScript: mutate,
    isSuccess,
    isLoading,
    reset,
  }
}

export default useRunScript

import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'
import { toast } from 'react-toastify'

type Permissions = {
  isAdmin: boolean
  isProcessor: boolean
  isPackIssuer: boolean
  isSubmitter: boolean
  isSubscribed: boolean
}

type UseAuthenticationRequest = {}

type UseAuthentication = {
  permissions: Permissions
  isFetching: boolean
  error: any
}

export const UseAuthenticationKey = 'use-authentication-key'

const useAuthentication = ({}: UseAuthenticationRequest): UseAuthentication => {
  const { data, error, isFetching } = useQuery(
    UseAuthenticationKey,
    async () => {
      return await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: Methods.GET,
        url: `/api/v2/auth/authenticate`,
      })
    },
    {
      onSuccess: () => {},
      onError: () => {},
    }
  )

  return {
    permissions: data?.data?.permissions ?? null,
    isFetching,
    error,
  }
}

export default useAuthentication

import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type UseAuthenticationRequest = {}

type UseAuthentication = {
  isAuthenticated: boolean
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
    }
  )

  return {
    isAuthenticated: data?.data?.isAuthenticated ?? false,
    isFetching,
    error,
  }
}

export default useAuthentication

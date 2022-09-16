import axios from 'axios'
import { useQuery } from 'react-query'
import { DOTTS_ACCESS_TOKEN } from '../../../../utils/constants'
import { Methods } from '../common'

type Permissions = {
  isAdmin: boolean
  isProcessor: boolean
  isPackIssuer: boolean
  isSubmitter: boolean
  isSubscribed: boolean
}

type UseGetDashboardPermissionsRequest = {}

type UseGetDashboardPermissions = {
  permissions: Permissions
  isFetching: boolean
}

export const UseGetDashboardPermissionsKey = 'use-get-dashboard-permissions-key'

const useGetDashboardPermissions =
  ({}: UseGetDashboardPermissionsRequest): UseGetDashboardPermissions => {
    const { data, isFetching } = useQuery(
      UseGetDashboardPermissionsKey,
      async () => {
        return await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: Methods.GET,
          url: '/api/v2/users/permissions/current',
        })
      }
    )

    return {
      permissions: data?.data?.permissions || null,
      isFetching,
    }
  }

export default useGetDashboardPermissions

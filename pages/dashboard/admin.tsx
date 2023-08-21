import { NextSeo } from 'next-seo'
import Router from 'next/router'
import Button from '../../components/buttons/button'
import Spinner from '../../components/spinners/spinner'
import useRunScript from '../api/v2/_mutations/use-run-script'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Admin = () => {
  const { currentUser, isFetching, error } = useGetCurrentUser({})
  const { runScript, isLoading, isSuccess, reset } = useRunScript()

  if (isFetching) {
    return <Spinner />
  }

  if (!currentUser.isAdmin) {
    Router.push('/dashboard')
  }

  return (
    <>
      <NextSeo title="Admin" />
      <Button
        onClick={() => runScript({ scriptName: 'updateCurrentRotation' })}
        isLoading={isLoading}
      >
        Run updateCurrentRotation
      </Button>
      <Button
        onClick={() => runScript({ scriptName: 'issueCharityCards' })}
        isLoading={isLoading}
      >
        Run issueCharityCards
      </Button>
    </>
  )
}

export default Admin

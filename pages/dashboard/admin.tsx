import { NextSeo } from 'next-seo'
import Router from 'next/router'
import Button from '../../components/buttons/button'
import Spinner from '../../components/spinners/spinner'
import useRunScript from '../api/v2/_mutations/use-run-script'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'

const Admin = () => {
  const { currentUser, isFetching } = useGetCurrentUser({})
  const { runScript, isLoading } = useRunScript()

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
        disabled={true}
      >
        Run updateCurrentRotation
      </Button>
      <Button
        onClick={() => runScript({ scriptName: 'issueCharityCards' })}
        isLoading={isLoading}
        disabled={true}
      >
        Run issueCharityCards
      </Button>
      <Button
        onClick={() => runScript({ scriptName: 'getDiscordCards' })}
        isLoading={isLoading}
        disabled={false}
      >
        Get Imgur Cards
      </Button>
    </>
  )
}

export default Admin

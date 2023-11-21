import { NextSeo } from 'next-seo'
import Router from 'next/router'
import Button from '../../components/buttons/button'
import Spinner from '../../components/spinners/spinner'
import useRunScript from '../api/v2/_mutations/use-run-script'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import 'react-csv-importer/dist/index.css'
import { Importer, ImporterField } from 'react-csv-importer'

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
      <div className="">
        <Button
          onClick={() =>
            runScript({ scriptName: 'updateCurrentRotation', scriptData: null })
          }
          isLoading={isLoading}
          disabled={true}
          classname="my-1"
        >
          Run updateCurrentRotation
        </Button>
        <Button
          onClick={() =>
            runScript({ scriptName: 'issueCharityCards', scriptData: null })
          }
          isLoading={isLoading}
          disabled={true}
          classname="my-1"
        >
          Run issueCharityCards
        </Button>
        <Button
          onClick={() =>
            runScript({ scriptName: 'getDiscordCards', scriptData: null })
          }
          isLoading={isLoading}
          disabled={false}
          classname="my-1"
        >
          Get Discord Cards
        </Button>
        <div className="my-1">
          <Importer
            dataHandler={async (rows, { startIndex }) => {
              const data = JSON.stringify(rows, null, 2)
              runScript({
                scriptName: 'fixDiscordCards',
                scriptData: data,
              })
            }}
            restartable={false}
            defaultNoHeader={false}
          >
            <ImporterField name="_id" label="_id" />
            <ImporterField name="old_image_url" label="old_image_url" />
            <ImporterField name="new_image_url" label="new_image_url" />
          </Importer>
        </div>
      </div>
    </>
  )
}

export default Admin

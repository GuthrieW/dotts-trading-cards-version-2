import React, { useState } from 'react'
import { Form, Formik } from 'formik'
import useInsertCard from '../api/v2/_mutations/use-insert-card'
import { toast } from 'react-toastify'
import TextField from '../../components/fields/text-field'
import SelectField from '../../components/fields/select-field'
import { RARITIES, TEAMS } from '../../utils/constants'
import { NextSeo } from 'next-seo'
import FormWrapper from '../../components/forms/form-wrapper'
import SubmitButton from '../../components/buttons/submit-button'
import useGetCurrentUser from '../api/v2/_queries/use-get-current-user'
import Spinner from '../../components/spinners/spinner'
import Router from 'next/router'

const SubmitCards = () => {
  const [newCardImage, setNewCardImage] = useState<string>('')
  const { insertCard, isSuccess, isLoading } = useInsertCard()
  const { currentUser, isFetching } = useGetCurrentUser({})

  if (isFetching) {
    return <Spinner />
  }

  if (!currentUser.isAdmin && !currentUser.isSubmitter) {
    Router.push('/dashboard')
  }

  if (isSuccess) {
    Router.push('/dashboard/submit-cards')
  }

  return (
    <>
      <NextSeo title="Submit Cards" />
      <h1>Submit Cards</h1>
      <div className="flex flex-row w-full">
        <div className="w-1/2">
          <FormWrapper>
            <Formik
              initialValues={{
                imageUrl: '',
                playerName: '',
                playerTeam: '',
                rarity: '',
              }}
              onSubmit={({ imageUrl, playerName, playerTeam, rarity }) => {
                event.preventDefault()
                if (isLoading) {
                  toast.warning('Already inserting card')
                  return
                }
                if (imageUrl === '') {
                  toast.warning('Please enter an image url')
                  return
                }
                if (playerName === '') {
                  toast.warning('Please enter a player name')
                  return
                }
                if (playerTeam === '') {
                  toast.warning('Please enter a player team')
                  return
                }
                if (rarity === '') {
                  toast.warning('Please enter a rarity')
                  return
                }

                insertCard({
                  imageUrl,
                  playerName,
                  playerTeam,
                  rarity,
                  submissionUsername: currentUser.isflUsername,
                })
              }}
            >
              {({ handleSubmit }) => (
                <Form
                  className="w-full"
                  onChange={(event) => {
                    // @ts-ignore
                    if (event.target.name === 'imageUrl') {
                      // @ts-ignore
                      setNewCardImage(event.target.value)
                    }
                  }}
                >
                  <TextField
                    name="playerName"
                    label="Player Name"
                    type="text"
                    disabled={false}
                  />
                  <SelectField
                    name="playerTeam"
                    label="Player Team"
                    options={TEAMS.map((team) => {
                      return {
                        label: `${team.CITY_NAME} ${team.TEAM_NAME}`,
                        value: `${team.CITY_NAME} ${team.TEAM_NAME}`,
                      }
                    })}
                    disabled={false}
                  />
                  <SelectField
                    name="rarity"
                    label="Rarity"
                    options={RARITIES}
                    disabled={false}
                  />
                  <TextField
                    name="imageUrl"
                    label="Image Ulr"
                    type="text"
                    disabled={false}
                  />
                  <div className="flex items-center justify-end p-6">
                    <SubmitButton
                      onClick={() => handleSubmit()}
                      isLoading={isLoading}
                    >
                      Submit Card
                    </SubmitButton>
                  </div>
                </Form>
              )}
            </Formik>
          </FormWrapper>
        </div>
        <div className="w-1/2 flex justify-center items-center">
          {newCardImage && <img src={newCardImage} />}
        </div>
      </div>
    </>
  )
}

export default SubmitCards

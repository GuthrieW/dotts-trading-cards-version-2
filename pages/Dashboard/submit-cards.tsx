import React from 'react'
import { Form, Formik } from 'formik'
import useInsertCard from '../api/v2/_mutations/use-insert-card'
import { toast } from 'react-toastify'
import TextField from '../../components/fields/text-field'
import SelectField from '../../components/fields/select-field'
import { RARITIES, TEAMS } from '../../utils/constants'
import { NextSeo } from 'next-seo'

const SubmitCards = () => {
  const { insertCard, isSuccess, isLoading, error } = useInsertCard()

  if (error) {
    toast.warning('Error inserting card')
  }

  if (isSuccess) {
    toast.success('Card successfully inserted')
  }

  return (
    <>
      <NextSeo title="Submit Cards" />
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          event.preventDefault()
          if (isLoading) {
            toast.warning('Already inserting card')
          }

          insertCard(values)
        }}
      >
        {({ handleSubmit }) => (
          <Form>
            <TextField
              name="player-name"
              label="Player Name"
              type="text"
              disabled={false}
            />
            <SelectField
              name="player-team"
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
              name="card-rarity"
              label="Card Rarity"
              options={RARITIES}
              disabled={false}
            />
            <TextField
              name="card-image"
              label="Card Image"
              type="text"
              disabled={false}
            />
            <div className="flex items-center justify-end p-6">
              <button
                onClick={() => handleSubmit()}
                type="submit"
                disabled={isLoading}
                className=""
              >
                Submit Card
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default SubmitCards

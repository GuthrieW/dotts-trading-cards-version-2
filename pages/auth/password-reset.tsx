import React from 'react'
import { Form, Formik } from 'formik'
import TextField from '../../comps/fields/text-field'
import { toast } from 'react-toastify'
import usePasswordReset from '../api/v2/_mutations/use-password-reset'

const PasswordReset = () => {
  const { passwordReset, isSuccess, isLoading, error } = usePasswordReset()

  if (isSuccess) {
    toast.success('Pog you did it')
  }

  if (error) {
    toast.error(error)
  }

  return (
    <Formik
      initialValues={{}}
      onSubmit={(values) => {
        event.preventDefault()
        if (isLoading) {
          toast.warning('Already resetting password')
          return
        }

        passwordReset(values)
      }}
    >
      {({ handleSubmit }) => (
        <Form>
          <TextField name="password" label="Password" type="password" />
          <TextField
            name="confirm-password"
            label="Confirm Password"
            type="password"
          />
          <div className="flex items-center justify-end p-6">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              disabled={isLoading}
              className=""
            >
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default PasswordReset

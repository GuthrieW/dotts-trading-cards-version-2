import React from 'react'
import useForgotPassword from '../api/v2/mutations/use-forgot-password'
import { Form, Formik } from 'formik'
import TextField from '../../comps/fields/text-field'
import { toast } from 'react-toastify'

const ForgotPassword = () => {
  const { forgotPassword, isSuccess, isLoading, error } = useForgotPassword()

  if (isSuccess) {
    toast.success('Check your email boi')
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
          toast.warning('Already sending email')
          return
        }

        forgotPassword(values)
      }}
    >
      {({ handleSubmit }) => (
        <Form>
          <TextField name="email" label="Email" type="text" />
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

export default ForgotPassword

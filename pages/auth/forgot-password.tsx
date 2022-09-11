import React from 'react'
import useForgotPassword from '../api/v2/_mutations/use-forgot-password'
import { Form, Formik } from 'formik'
import TextField from '../../comps/fields/text-field'
import { toast } from 'react-toastify'
import SubmitButton from '../../comps/buttons/submit-button'
import FormWrapper from '../../comps/forms/form-wrapper'
import { NextSeo } from 'next-seo'

const ForgotPassword = () => {
  const { forgotPassword, isSuccess, isLoading, error } = useForgotPassword()

  if (isSuccess) {
    toast.success('Check your email boi')
  }

  if (error) {
    toast.error(error)
  }

  return (
    <>
      <NextSeo title="Forgot Password" />
      <FormWrapper>
        <Formik
          initialValues={{
            email: '',
          }}
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
            <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 w-1/2">
              <TextField name="email" label="Email" type="text" />
              <div className="flex items-center justify-between">
                <SubmitButton
                  onClick={() => handleSubmit()}
                  isLoading={isLoading}
                  text="Submit"
                />
                <a
                  className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                  href="/auth/login"
                >
                  Cancel
                </a>
              </div>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </>
  )
}

export default ForgotPassword
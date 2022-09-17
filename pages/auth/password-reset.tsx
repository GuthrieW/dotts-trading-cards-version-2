import React from 'react'
import { Form, Formik } from 'formik'
import TextField from '../../components/fields/text-field'
import { toast } from 'react-toastify'
import usePasswordReset from '../api/v2/_mutations/use-password-reset'
import SubmitButton from '../../components/buttons/submit-button'
import FormWrapper from '../../components/forms/form-wrapper'
import { NextSeo } from 'next-seo'
import Router from 'next/router'

const PasswordReset = () => {
  const { passwordReset, isSuccess, isLoading } = usePasswordReset()

  if (isSuccess) {
    Router.push('/auth/login')
  }

  return (
    <>
      <NextSeo title="Reset Password" />
      <FormWrapper>
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
            <Form className="bg-neutral-600 shadow-lg">
              <TextField name="password" label="Password" type="password" />
              <TextField
                name="confirm-password"
                label="Confirm Password"
                type="password"
              />
              <div className="flex items-center justify-between">
                <SubmitButton
                  onClick={() => handleSubmit()}
                  isLoading={isLoading}
                >
                  Reset Password
                </SubmitButton>
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

export default PasswordReset

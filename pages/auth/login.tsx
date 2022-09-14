import React from 'react'
import useLogin from '../api/v2/_mutations/use-login'
import { Form, Formik } from 'formik'
import TextField from '../../components/fields/text-field'
import { toast } from 'react-toastify'
import SubmitButton from '../../components/buttons/submit-button'
import FormWrapper from '../../components/forms/form-wrapper'
import Router from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../utils/constants'
import { NextSeo } from 'next-seo'

const Login = () => {
  const {
    login,
    accessToken,
    authenticationFailed,
    isSuccess,
    isLoading,
    error,
  } = useLogin()

  if (isSuccess && accessToken) {
    toast.success('Login successful')
    localStorage.setItem(DOTTS_ACCESS_TOKEN, accessToken)
    if (typeof window !== 'undefined') {
      Router.push('/dashboard')
    }
  }

  if (authenticationFailed) {
    toast.error(authenticationFailed)
  }

  return (
    <>
      <NextSeo title="Login" />
      <FormWrapper>
        <Formik
          initialValues={{ email: '', password: '' }}
          onSubmit={async (values) => {
            event.preventDefault()
            if (isLoading) {
              toast.warning('Already logging in')
              return
            }

            const result = await login({
              email: values.email,
              password: values.password,
            })
          }}
        >
          {({ handleSubmit }) => (
            <Form className="bg-neutral-600 shadow-lg rounded px-8 pt-6 pb-8 my-4 w-1/2">
              <TextField name="email" label="Email" type="text" />
              <TextField name="password" label="Password" type="password" />
              <div className="flex items-center justify-between">
                <SubmitButton
                  onClick={() => handleSubmit()}
                  isLoading={isLoading}
                >
                  Login
                </SubmitButton>
                <div className="flex items-center justify-between">
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2"
                    href="/auth/sign-up"
                  >
                    Sign Up
                  </a>
                  <a
                    className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 ml-2"
                    href="/auth/forgot-password"
                  >
                    Forgot Password?
                  </a>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </FormWrapper>
    </>
  )
}

export default Login

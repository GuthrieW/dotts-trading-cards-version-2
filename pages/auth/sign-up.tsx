import { Form, Formik } from 'formik'
import { NextSeo } from 'next-seo'
import React from 'react'
import { toast } from 'react-toastify'
import SubmitButton from '../../components/buttons/submit-button'
import TextField from '../../components/fields/text-field'
import FormWrapper from '../../components/forms/form-wrapper'
import useSignUp from '../api/v2/_mutations/use-sign-up'
import { passwordStrength } from 'check-password-strength'
import { validate } from 'email-validator'

const SignUp = () => {
  const { signUp, isSuccess, isLoading, reset } = useSignUp()

  if (isSuccess) {
    toast.success('Wow you signed up')
  }

  return (
    <>
      <NextSeo title="Sign Up" />
      <FormWrapper>
        <Formik
          initialValues={{
            email: '',
            username: '',
            password: '',
            confirm: '',
          }}
          onSubmit={(values) => {
            event.preventDefault()
            if (!validate(values.email)) {
              toast.error('Please provide a valid email')
              return
            }

            if (passwordStrength(values.password).value !== 'Strong') {
              toast.error(
                'Password not strong enough. Must include an uppercase letter, a lowercase letter, a symbol, a number and be at least 10 characters in length'
              )
              return
            }

            if (values.password !== values.confirm) {
              toast.error('Password and confirmation must match')
              return
            }

            if (isLoading) {
              toast.warning('Already signing up')
              return
            }

            signUp({
              email: values.email,
              username: values.username,
              password: values.password,
              confirm: values.confirm,
            })
          }}
        >
          {({ handleSubmit }) => (
            <Form className="bg-neutral-600 shadow-lg rounded px-8 pt-6 pb-8 my-4 w-1/2">
              <TextField name="email" label="Email" type="text" />
              <TextField name="username" label="ISFL Username" type="text" />
              <TextField name="password" label="Password" type="password" />
              <TextField
                name="confirm"
                label="Confirm Password"
                type="password"
              />
              <div className="flex items-center justify-between">
                <SubmitButton
                  onClick={() => handleSubmit()}
                  isLoading={isLoading}
                >
                  Sign Up
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

export default SignUp

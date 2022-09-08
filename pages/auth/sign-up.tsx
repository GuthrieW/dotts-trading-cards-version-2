import { Form, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import SubmitButton from '../../comps/buttons/submit-button'
import TextField from '../../comps/fields/text-field'
import FormWrapper from '../../comps/forms/form-wrapper'
import useSignUp from '../api/v2/_mutations/use-sign-up'

const SignUp = () => {
  const { signUp, isSuccess, isLoading, error } = useSignUp()

  if (isSuccess) {
    toast.success('Wow you signed up')
  }

  if (error) {
    toast.error('Aww frick you hecked up')
  }

  return (
    <FormWrapper>
      <Formik
        initialValues={{}}
        onSubmit={(values) => {
          event.preventDefault()
          if (isLoading) {
            toast.warning('Already signing up')
            return
          }

          signUp(values)
        }}
      >
        {({ handleSubmit }) => (
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 w-1/2">
            <TextField name="email" label="Email" type="text" />
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
                text="Sign Up"
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
  )
}

export default SignUp

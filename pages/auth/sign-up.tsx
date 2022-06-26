import { Form, Formik } from 'formik'
import React from 'react'
import { toast } from 'react-toastify'
import TextField from '../../comps/fields/text-field'
import useSignUp from '../api/v2/mutations/use-sign-up'

const SignUp = () => {
  const { signUp, isSuccess, isLoading, error } = useSignUp()

  if (isSuccess) {
    toast.success('Wow you signed up')
  }

  if (error) {
    toast.error('Aww frick you hecked up')
  }

  return (
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
        <Form>
          <TextField name="email" label="Email" type="text" />
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
              Sign Up
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default SignUp

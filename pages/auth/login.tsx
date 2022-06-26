import React from 'react'
import useLogin from '../api/v2/mutations/use-login'
import { Form, Formik } from 'formik'
import TextField from '../../comps/fields/text-field'
import { toast } from 'react-toastify'

const Login = () => {
  const { login, isSuccess, isLoading, error } = useLogin()

  if (isSuccess) {
    toast.success('Congrats you have an account')
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
          toast.warning('Already logging in')
          return
        }

        login(values)
      }}
    >
      {({ handleSubmit }) => (
        <Form>
          <TextField name="email" label="Email" type="text" />
          <TextField name="password" label="Password" type="password" />
          <div className="flex items-center justify-end p-6">
            <button
              onClick={() => handleSubmit()}
              type="submit"
              disabled={isLoading}
              className=""
            >
              Login
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}

export default Login

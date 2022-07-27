import React from 'react'
import useLogin from '../api/v2/_mutations/use-login'
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
    <div className="flex justify-center items-center">
      <Formik
        initialValues={{}}
        onSubmit={async (values) => {
          event.preventDefault()
          if (isLoading) {
            toast.warning('Already logging in')
            return
          }

          const result = await login(values)
          console.log('result', result)
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
                className=" bg-red-700 red-700 text-red-700 w-96"
              >
                Login
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login

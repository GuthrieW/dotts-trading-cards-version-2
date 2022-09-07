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
          <Form className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-4 w-1/2">
            <TextField
              name="email"
              label="Email"
              type="text"
              placeholder="Email"
            />
            <TextField
              name="password"
              label="Password"
              type="password"
              placeholder="Password"
            />
            <div className="flex items-center justify-between">
              <button
                onClick={() => handleSubmit()}
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Login
              </button>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                href="#"
              >
                Forgot Password?
              </a>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  )
}

export default Login

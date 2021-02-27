import { TextField, Button, Link } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'
import { Alert, AlertTitle } from '@material-ui/lab'
import Router from 'next/router'
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import SplashLayout from '../../../layouts/SplashLayout'

const LogInPage = () => {
  // const classes = useStyles()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEmail(event.target.value)
    updateCanSubmit()
  }

  const handlePasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setPassword(event.target.value)
    updateCanSubmit()
  }

  const updateCanSubmit = () => {
    const emailExists = email.trim().length > 0
    const passwordExists = password.trim().length > 0

    setCanSubmit(emailExists && passwordExists)
  }

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.keyCode === 13 || event.which === 13) {
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    event.preventDefault()
    if (canSubmit) {
      setIsSubmitting(true)
      const result = await axios({
        method: 'post',
        url: `/api/v1/authorization/logIn`,
        data: {
          email: email,
          password: password,
        },
      })

      if (result.data.error) {
        setError(result.data.error)
      } else if (result.data.accessToken) {
        localStorage.setItem(DOTTS_ACCESS_TOKEN, result.data.accessToken)
        Router.push({
          pathname: `/`,
        })
      } else {
        setError('Unknown Server Error')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1>Log In</h1>
      <TextField
        fullWidth
        id="email"
        type="email"
        label="Email"
        margin="normal"
        onChange={handleEmailChange}
        onBlur={updateCanSubmit}
        onKeyPress={handleKeyPress}
        disabled={isSubmitting}
      />
      <TextField
        fullWidth
        id="password"
        type="password"
        label="Password"
        margin="normal"
        onChange={handlePasswordChange}
        onBlur={updateCanSubmit}
        onKeyPress={handleKeyPress}
        disabled={isSubmitting}
      />
      {error && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {error}
        </Alert>
      )}
      <Button
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        Log In
      </Button>
      <Link href="/Authentication/ForgotPassword/">
        <Button size="large" color="primary" disabled={isSubmitting}>
          Forgot Password
        </Button>
      </Link>
      <Link href="/Authentication/SignUp/">
        <Button
          variant="contained"
          size="large"
          color="primary"
          disabled={isSubmitting}
        >
          Create New Account
        </Button>
      </Link>
    </>
  )
}

LogInPage.layout = () => <SplashLayout children={<LogInPage />} />

export default LogInPage

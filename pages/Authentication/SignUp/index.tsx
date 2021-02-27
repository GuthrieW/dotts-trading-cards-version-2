import { TextField, Button, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import EmailValidator from 'email-validator'
import CheckPasswordStrength from 'check-password-strength'
import useStyles from './SignUp.styles'
import axios from 'axios'
import Router from 'next/router'
import { Alert, AlertTitle } from '@material-ui/lab'
import SplashLayout from '../../../layouts/SplashLayout'

const SignUpPage = () => {
  const classes = useStyles()
  const [email, setEmail] = useState('')
  const [isflUsername, setIsflUsername] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleIsflUsernameChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setIsflUsername(event.target.value)
    updateCanSubmit()
  }

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

  const handleConfirmPasswordChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setConfirmPassword(event.target.value)
    updateCanSubmit()
  }

  const updateCanSubmit = () => {
    const emailExists = email.trim().length > 0
    const passwordExists = password.trim().length > 0
    const confirmPasswordExists = confirmPassword.trim().length > 0
    const isflUsernameExists = isflUsername.trim().length > 0

    if (
      emailExists &&
      passwordExists &&
      confirmPasswordExists &&
      isflUsernameExists
    ) {
      const emailValidity = EmailValidator.validate(email)
      const passwordStrength = CheckPasswordStrength(password).value

      if (emailValidity) {
        if (passwordStrength === 'Strong') {
          if (password === confirmPassword) {
            setError('')
            setCanSubmit(true)
          } else {
            setError('Your password and confirm password do not match')
            setCanSubmit(false)
          }
        } else {
          setError('Password not strong enough')
          setCanSubmit(false)
        }
      } else {
        setError('Invalid email')
        setCanSubmit(false)
      }
    } else {
      setCanSubmit(false)
    }
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
        url: `${window.location.host}/api/v1/authorization/signUp`,
        data: {
          email: email,
          isflUsername: isflUsername,
          password: password,
        },
      })

      if (result.data.error) {
        setError(result.data.error)
      } else if (result.data.success) {
        Router.push({
          pathname: `/Authentication/LogIn`,
        })
      } else {
        setError('Unknown Server Error')
      }
    }
    setIsSubmitting(false)
  }

  return (
    <>
      <h1>Sign Up</h1>
      <TextField
        className={classes.usernameField}
        fullWidth
        id="isfl-username"
        type="text"
        label="ISFL Username"
        margin="normal"
        onChange={handleIsflUsernameChange}
        onBlur={updateCanSubmit}
        onKeyPress={handleKeyPress}
        disabled={isSubmitting}
      />
      <TextField
        className={classes.emailField}
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
        className={classes.passwordField}
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
      <TextField
        className={classes.passwordField}
        fullWidth
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        margin="normal"
        onChange={handleConfirmPasswordChange}
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
        className={classes.loginButton}
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        Sign Up
      </Button>
    </>
  )
}
SignUpPage.layout = () => <SplashLayout children={<SignUpPage />} />

export default SignUpPage

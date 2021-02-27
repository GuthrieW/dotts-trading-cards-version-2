import CheckPasswordStrength from 'check-password-strength'
import { Alert, AlertTitle } from '@material-ui/lab'
import Router, { useRouter } from 'next/router'
import axios from 'axios'
import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import useStyles from './PasswordReset.styles'
import SplashLayout from '../../../layouts/SplashLayout'

const PasswordResetPage = () => {
  const router = useRouter()
  const { resetToken } = router.query

  const classes = useStyles()
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')
  const [link, setLink] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    const passwordExists = password.trim().length > 0
    const confirmPasswordExists = confirmPassword.trim().length > 0

    if (passwordExists && confirmPasswordExists) {
      const passwordStrength = CheckPasswordStrength(password).value
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
        url: `${window.location.href}/api/v1/authorization/resetPassword`,
        data: {
          resetToken: resetToken,
          password: password,
        },
      })

      if (result.data.error) {
        setLink(result.data.link)
        setError(result.data.error)
      } else if (result.data.success) {
        Router.push({
          pathname: `/Authentication/LogIn`,
        })
      } else {
        setError('Unknown Server Error')
      }
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <h1>Reset Password</h1>
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
          {link && (
            <a
              href={link}
              style={{ textDecoration: 'underline', color: 'blue' }}
            >
              {link}
            </a>
          )}
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
        Reset Password
      </Button>
    </>
  )
}

PasswordResetPage.layout = () => (
  <SplashLayout children={<PasswordResetPage />} />
)

export default PasswordResetPage

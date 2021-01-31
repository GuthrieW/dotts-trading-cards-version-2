import { TextField, Button } from '@material-ui/core'
import React, { useState } from 'react'
import { API_URL } from '../../../utils/constants'
import axios from 'axios'
import Router from 'next/router'
import EmailValidator from 'email-validator'
import { Alert, AlertTitle } from '@material-ui/lab'

const index = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [canSubmit, setCanSubmit] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleEmailChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    setEmail(event.target.value)
    updateCanSubmit()
  }

  const updateCanSubmit = () => {
    const emailExists = email.trim().length > 0
    console.log(emailExists)
    if (emailExists) {
      const emailValidity = EmailValidator.validate(email)
      console.log(emailValidity)
      if (emailValidity) {
        setError('')
        setCanSubmit(true)
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
    if (canSubmit) {
      setIsSubmitting(true)
      const result = await axios({
        method: 'post',
        url: `${API_URL}/api/v1/authorization/forgotPassword`,
        data: {
          email: email,
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
      <p>
        You will be sent an email with a clickable link to reset your password.
      </p>
      <TextField
        // className={classes.emailField}
        fullWidth
        id="email"
        type="email"
        label="email"
        margin="normal"
        onChange={handleEmailChange}
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
        // className={classes.loginButton}
        variant="contained"
        size="large"
        color="primary"
        onClick={handleSubmit}
        disabled={!canSubmit || isSubmitting}
      >
        Reset My Password
      </Button>
    </>
  )
}

export default index

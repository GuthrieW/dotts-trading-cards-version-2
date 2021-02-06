import {
  CircularProgress,
  TextField,
  Switch,
  FormGroup,
  FormControlLabel,
  Button,
} from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import Router from 'next/router'

/**
 * This page is for two purposes. If you are an admin you can use this page to change anything about
 * the user, but if you are a card submitter this page is for updating their isSubscribed variable.
 */

const emptyUser = {
  isflUsername: '',
  email: '',
  isSubscribed: false,
  isAdmin: false,
  isPackIssuer: false,
  isProcessor: false,
  isSubmitter: false,
}

const UserEditorPage = () => {
  const [users, setUsers] = useState(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [chosenUser, setChosenUser] = useState(emptyUser)

  const [accountIsflUsername, setAccountIsflUsername] = useState('')
  const [accountEmail, setAccountEmail] = useState('')
  const [accountIsSubscribed, setAccountIsSubscribed] = useState(false)
  const [accountIsAdmin, setAccountIsAdmin] = useState(false)
  const [accountIsPackIssuer, setAccountIsPackIssuer] = useState(false)
  const [accountIsProcessor, setAccountIsProcessor] = useState(false)
  const [accountIsSubmitter, setAccountIsSubmitter] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/currentUser/`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)

      const allUsers = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${API_URL}/api/v1/users/allUsers`,
        data: {},
      })

      if (allUsers.data.error) {
      }

      setUsers(allUsers.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  useEffect(() => {
    if (!chosenUser) {
      setChosenUser(emptyUser)
    }
  }, [chosenUser])

  const handleSubmit = async () => {
    const result = await axios({
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
      },
      method: 'post',
      url: `${API_URL}/api/v1/users/updateUser`,
      data: {
        oldIsflUsername: chosenUser.isflUsername,
        email: accountEmail,
        isflUsername: accountIsflUsername,
        isSubscribed: accountIsSubscribed,
        isAdmin: accountIsAdmin,
        isPackIssuer: accountIsPackIssuer,
        isProcessor: accountIsProcessor,
        isSubmitter: accountIsSubmitter,
      },
    })

    if (result.data.error) {
      console.log('in here')
    } else {
      Router.reload()
    }
  }

  if (!chosenUser || isLoading) {
    return <h1>Loading...</h1>
  }

  return (
    <>
      <h1>Edit a User</h1>

      <div
        style={{
          margin: '10px',
          alignItems: 'center',
          position: 'static',
          width: '50%',
        }}
      >
        <Autocomplete
          id="asynchronous-demo"
          style={{ width: 300 }}
          open={open}
          onOpen={() => {
            setOpen(true)
          }}
          onClose={() => {
            setOpen(false)
          }}
          onChange={(event, value) => {
            setChosenUser(value)
            setAccountIsflUsername(value.isflUsername)
            setAccountEmail(value.email)
            setAccountIsSubscribed(value.isSubscribed)
            setAccountIsAdmin(value.isAdmin)
            setAccountIsPackIssuer(value.isPackIssuer)
            setAccountIsProcessor(value.isProcessor)
            setAccountIsSubmitter(value.isSubmitter)
          }}
          getOptionSelected={(option: any, value: any) =>
            option.isflUsername === value.isflUsername
          }
          getOptionLabel={(option) => option.isflUsername}
          options={users}
          loading={isLoading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search for user"
              variant="outlined"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {isLoading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
        />

        <FormGroup>
          <TextField
            disabled={!currentUser.isAdmin}
            label="Email"
            value={accountEmail}
            onChange={(event) => {
              setAccountEmail(event.target.value)
            }}
          />
          <TextField
            disabled={!currentUser.isAdmin}
            label="ISFL Username"
            value={accountIsflUsername}
            onChange={(event) => {
              setAccountIsflUsername(event.target.value)
            }}
          />
          <FormControlLabel
            labelPlacement="start"
            label="Subscribed"
            control={
              <Switch
                disabled={!currentUser.isAdmin && !currentUser.isPackIssuer}
                checked={accountIsSubscribed}
                onChange={() => {
                  setAccountIsSubscribed(!accountIsSubscribed)
                }}
                name="isSubscribed"
                color="primary"
              />
            }
          />
          <FormControlLabel
            labelPlacement="start"
            control={
              <Switch
                disabled={!currentUser.isAdmin}
                checked={accountIsAdmin}
                onChange={() => {
                  setAccountIsAdmin(!accountIsAdmin)
                }}
                name="isAdmin"
                color="primary"
              />
            }
            label="Admin"
          />
          <FormControlLabel
            labelPlacement="start"
            label="Pack Issuer"
            control={
              <Switch
                disabled={!currentUser.isAdmin}
                checked={accountIsPackIssuer}
                onChange={() => {
                  setAccountIsPackIssuer(!accountIsPackIssuer)
                }}
                name="isPackIssuer"
                color="primary"
              />
            }
          />
          <FormControlLabel
            labelPlacement="start"
            label="Processor"
            control={
              <Switch
                disabled={!currentUser.isAdmin}
                checked={accountIsProcessor}
                onChange={() => {
                  setAccountIsProcessor(!accountIsProcessor)
                }}
                name="isProcessor"
                color="primary"
              />
            }
          />
          <FormControlLabel
            labelPlacement="start"
            label="Submitter"
            control={
              <Switch
                disabled={!currentUser.isAdmin}
                checked={accountIsSubmitter}
                onChange={() => {
                  setAccountIsSubmitter(!accountIsSubmitter)
                }}
                name="isSubmitter"
                color="primary"
              />
            }
          />
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Button
              type="submit"
              style={{
                width: '60%',
              }}
              variant="contained"
              color="primary"
              onClick={handleSubmit}
            >
              Save User
            </Button>
          </div>
        </FormGroup>
      </div>
    </>
  )
}

export default UserEditorPage

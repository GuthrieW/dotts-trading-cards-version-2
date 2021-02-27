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
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import Router from 'next/router'

const emptyUser = {
  isflUsername: '',
  email: '',
  isSubscribed: false,
  isAdmin: false,
  isPackIssuer: false,
  isProcessor: false,
  isSubmitter: false,
  ownedRegularPacks: 0,
  ownedUltimusPacks: 0,
}

const UserEditorPage = () => {
  const [users, setUsers] = useState(null)
  const [open, setOpen] = useState(false)
  const [isLoading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState(null)
  const [chosenUser, setChosenUser] = useState(emptyUser)

  const [accountIsflUsername, setAccountIsflUsername] = useState(
    emptyUser.isflUsername
  )
  const [accountEmail, setAccountEmail] = useState(emptyUser.email)
  const [accountIsSubscribed, setAccountIsSubscribed] = useState(
    emptyUser.isSubscribed
  )
  const [accountIsAdmin, setAccountIsAdmin] = useState(emptyUser.isAdmin)
  const [accountIsPackIssuer, setAccountIsPackIssuer] = useState(
    emptyUser.isPackIssuer
  )
  const [accountIsProcessor, setAccountIsProcessor] = useState(
    emptyUser.isProcessor
  )
  const [accountIsSubmitter, setAccountIsSubmitter] = useState(
    emptyUser.isSubmitter
  )
  const [accountOwnedRegularPacks, setAccountOwnedRegularPacks] = useState(
    emptyUser.ownedRegularPacks
  )
  const [accountOwnedUltimusPacks, setAccountOwnedUltimusPacks] = useState(
    emptyUser.ownedUltimusPacks
  )

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${window.location.href}/api/v1/users/currentUser/`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)

      const account = user.data.account
      if (!account.isAdmin && !account.isPackIssuer) {
        Router.push({
          pathname: '/OpenPacks',
        })
      }

      const allUsers = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `${window.location.href}/api/v1/users/allUsers`,
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
      url: `${window.location.href}/api/v1/users/updateUser`,
      data: {
        oldIsflUsername: chosenUser.isflUsername,
        email: accountEmail,
        isflUsername: accountIsflUsername,
        isSubscribed: accountIsSubscribed,
        isAdmin: accountIsAdmin,
        isPackIssuer: accountIsPackIssuer,
        isProcessor: accountIsProcessor,
        isSubmitter: accountIsSubmitter,
        ownedRegularPacks: accountOwnedRegularPacks,
        ownedUltimusPacks: accountOwnedUltimusPacks,
      },
    })

    if (result.data.error) {
    } else {
      Router.reload()
    }
  }

  if (!chosenUser || isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </div>
    )
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
            if (value) {
              setChosenUser(value)
              setAccountIsflUsername(value.isflUsername)
              setAccountEmail(value.email)
              setAccountIsSubscribed(value.isSubscribed)
              setAccountIsAdmin(value.isAdmin)
              setAccountIsPackIssuer(value.isPackIssuer)
              setAccountIsProcessor(value.isProcessor)
              setAccountIsSubmitter(value.isSubmitter)
              setAccountOwnedRegularPacks(value.ownedRegularPacks)
              setAccountOwnedUltimusPacks(value.ownedUltimusPacks)
            } else {
              setChosenUser(emptyUser)
              setAccountIsflUsername(emptyUser.isflUsername)
              setAccountEmail(emptyUser.email)
              setAccountIsSubscribed(emptyUser.isSubscribed)
              setAccountIsAdmin(emptyUser.isAdmin)
              setAccountIsPackIssuer(emptyUser.isPackIssuer)
              setAccountIsProcessor(emptyUser.isProcessor)
              setAccountIsSubmitter(emptyUser.isSubmitter)
              setAccountOwnedRegularPacks(emptyUser.ownedRegularPacks)
              setAccountOwnedUltimusPacks(emptyUser.ownedUltimusPacks)
            }
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
            type={currentUser.isAdmin ? 'text' : 'password'}
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
          <TextField
            disabled={!currentUser.isAdmin && !currentUser.isPackIssuer}
            type={'number'}
            label="Owned Regular Packs"
            value={accountOwnedRegularPacks}
            onChange={(event) => {
              setAccountOwnedRegularPacks(Number(event.target.value))
            }}
          />
          <TextField
            disabled={!currentUser.isAdmin && !currentUser.isPackIssuer}
            type={'number'}
            label="Owned Ultimus Packs"
            value={accountOwnedUltimusPacks}
            onChange={(event) => {
              setAccountOwnedUltimusPacks(Number(event.target.value))
            }}
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

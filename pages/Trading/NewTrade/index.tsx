import { TextField } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { Autocomplete } from '@material-ui/lab'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DOTTS_ACCESS_TOKEN } from '../../../utils/constants'
import TransferList from '../TransferList'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles((theme) => ({
  autocompleteContainer: {
    marginTop: 18,
  },
  tradePartnerSearch: {
    margin: '0 auto',
    width: 300,
  },
}))

const TradingPage = () => {
  const [open, setOpen] = React.useState(false)
  const [options, setOptions] = React.useState([])
  const [tradePartner, setTradePartner] = useState({})
  const loading = open && options.length === 0
  const classes = useStyles()
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      const user = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/currentUser`,
        data: {},
      })

      if (user.data.error) {
      }

      setCurrentUser(user.data.account)
    }

    fetchData()
  }, [])

  useEffect(() => {
    let active = true

    if (!loading) {
      return undefined
    }

    const fetchData = async () => {
      const accounts = await axios({
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
        },
        method: 'post',
        url: `/api/v1/users/allUsers`,
        data: {},
      })

      if (accounts.data.error) {
      } else {
        const allAccountsButCurrentUser = accounts.data.filter(
          (account) => account.email !== currentUser
        )
        setOptions(allAccountsButCurrentUser)
      }
    }

    if (active) {
      fetchData()
    }

    return () => {
      active = false
    }
  }, [loading])

  useEffect(() => {
    if (!open) {
      setOptions([])
    }
  }, [open])

  const handleSelectTradePartner = (event, value) => {
    if (value) {
      console.log({ value })
      setTradePartner({ email: value.isflUsername, id: value._id })
    } else {
      setTradePartner('')
    }
  }
  return (
    <div className={classes.autocompleteContainer}>
      <Autocomplete
        id="asynchronous-demo"
        className={classes.tradePartnerSearch}
        open={open}
        onOpen={() => {
          setOpen(true)
        }}
        onClose={() => {
          setOpen(false)
        }}
        //   getOptionSelected={(option, value) => option.isflUsername === value.isflUsername}
        getOptionLabel={(option) => option.isflUsername || ''}
        options={options}
        loading={loading}
        onChange={(event, value) => handleSelectTradePartner(event, value)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Choose a trade partner..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <React.Fragment>
                  {loading ? (
                    <CircularProgress color="inherit" size={20} />
                  ) : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
      <TransferList tradePartner={tradePartner} />
    </div>
  )
}

export default TradingPage

import { CircularProgress, TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { API_URL, DOTTS_ACCESS_TOKEN } from '../../../utils/constants';

/**
 * This page is for two purposes. If you are an admin you can use this page to change anything about
 * the user, but if you are a card submitter this page is for updating their isSubscribed variable.
 */

const SubmitterPage = () => {
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState('');
  const [open, setOpen] = React.useState(false);
  const loading = open && users.length === 0;

  useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    console.log(users.length)

    if (users.length === 0) {
      (async () => {
        const users = await axios({
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem(DOTTS_ACCESS_TOKEN),
          },
          method: 'post',
          url: `${API_URL}/api/v1/users/allUsers`,
          data: {}
        });

        if (active) {
          console.log({ users })
          setUsers(users.data)
        }
      })();
    }
    return () => {
      active = false;
    };

  }, [loading]);

  React.useEffect(() => {
    if (!open && users.length === 0) {
      setUsers([]);
    }
  }, [open]);

  return (<div>
    <h1>Submitter Page</h1>

    <Autocomplete
      id="asynchronous-demo"
      style={{ width: 300 }}
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      onChange={(event, value) => setCurrentUser(value.isflUsername)}
      getOptionSelected={(option, value) => option.isflUsername === value.isflUsername}
      getOptionLabel={(option) => option.isflUsername}
      options={users}
      loading={loading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search for user"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
    <pre>current user: {currentUser}</pre>
  </div>)
}

export default SubmitterPage

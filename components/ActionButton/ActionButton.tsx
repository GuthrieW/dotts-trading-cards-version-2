import { Fab } from '@material-ui/core';
import React from 'react';
import useStyles from './ActionButton.styles';

const ActionButton = ({ label }) => {
  const classes = useStyles();

  return (
    <Fab color="primary" variant="extended" className={classes.actionButton}>
      {label}
    </Fab>
  )
}

export default ActionButton;
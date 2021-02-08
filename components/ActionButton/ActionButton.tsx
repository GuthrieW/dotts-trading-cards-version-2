import { Fab } from '@material-ui/core'
import React from 'react'
import useStyles from './ActionButton.styles'

const ActionButton = ({ onClick, label }) => {
  const classes = useStyles()

  return (
    <Fab
      onClick={onClick}
      color="primary"
      variant="extended"
      className={classes.actionButton}
    >
      {label}
    </Fab>
  )
}

export default ActionButton

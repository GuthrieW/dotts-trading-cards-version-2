import { Fab } from '@material-ui/core'
import React from 'react'
import useStyles from './ActionButton.styles'

const ActionButton = ({ onClick, label, disabled = false, style = {} }) => {
  const classes = useStyles()

  return (
    <Fab
      onClick={onClick}
      color="primary"
      variant="extended"
      className={classes.actionButton}
      disabled={disabled}
      style={style}
    >
      {label}
    </Fab>
  )
}

export default ActionButton

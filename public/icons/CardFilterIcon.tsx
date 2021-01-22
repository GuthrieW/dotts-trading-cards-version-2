import { Icon, makeStyles } from '@material-ui/core'
import React from 'react'

const useStyles = makeStyles({
  imageIcon: {
    display: 'flex',
    height: 'inherit',
    width: 'inherit',
  },
  iconRoot: {
    textAlign: 'center',
  },
})

const CardFilterIcon = ({ iconImage }) => {
  const classes = useStyles()
  return (
    <Icon classes={{ root: classes.iconRoot }}>
      <img className={classes.imageIcon} src={iconImage} />
    </Icon>
  )
}

export default CardFilterIcon

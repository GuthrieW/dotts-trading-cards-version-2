import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  actionButton: {
    zIndex: 1,
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
    [theme.breakpoints.down('md')]: {
      bottom: 70,
    },
  },
  cardImage: {
    maxWidth: '100%',
    maxHeight: 500,
  },
}))

export default useStyles

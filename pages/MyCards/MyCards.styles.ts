import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    paddingLeft: 0,
    paddingRight: 0,
  },
  cardDisplay: {
    height: 150,
    paddingLeft: 0,
    [theme.breakpoints.up('md')]: {
      marginLeft: 32,
      height: 200,
      textAlign: 'center',
    },
  },
}))

export default useStyles

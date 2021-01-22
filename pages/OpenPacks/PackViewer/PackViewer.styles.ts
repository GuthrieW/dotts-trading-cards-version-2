import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  packViewerContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  viewStyleGroup: {
    position: 'absolute',
    bottom: 64,
    [theme.breakpoints.up('lg')]: {
      bottom: 28,
    },
  },
}))

export default useStyles

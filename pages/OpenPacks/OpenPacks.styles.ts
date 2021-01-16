import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  packsGrid: {
    margin: '0 !important',
  },
  linkContainer: {
    height: '100%',
    textAlign: 'center',
  },
  cardContainer: {
    height: '100%',
    maxWidth: '100%',
  },
  packImage: {
    height: '100%',
    objectFit: 'cover',
  },
}))

export default useStyles

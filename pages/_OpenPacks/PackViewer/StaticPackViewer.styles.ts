import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  allCards: {
    backgroundSize: 'contain',
    maxWidth: 1200,
    margin: '0 !important',
  },
  cardContainer: {
    height: '100%',
    maxWidth: '100%',
  },
  cardImage: {
    maxWidth: '100%',
    maxHeight: '100%',
    objectFit: 'contain',
  },
}))

export default useStyles

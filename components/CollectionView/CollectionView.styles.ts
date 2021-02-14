import { fade, makeStyles } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    paddingLeft: 12,
    paddingRight: 12,
    [theme.breakpoints.down('md')]: {
      marginBottom: 70,
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      maxWidth: '80%',
      paddingLeft: 30,
    },
  },
  chipList: {
    paddingBottom: 10,
  },
  rarityChip: {
    marginRight: 6,
  },
  cardContainer: {
    maxWidth: '100%',
    maxHeight: '100%',
    margin: 0,
    padding: 10,
  },
  search: {
    marginTop: 8,
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    width: '100%',
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  collectionContainer: {
    margin: 0,
    marginTop: 16,
  },
}))

export default useStyles

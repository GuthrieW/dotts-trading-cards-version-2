import { makeStyles } from '@material-ui/core/styles'

const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('lg')]: {
      display: 'flex',
    },
  },
  appBar: {
    [theme.breakpoints.up('lg')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  sidebarLogo: {
    maxWidth: '100%',
    maxHeight: 64,
  },
  drawer: {
    width: 100,
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
    },
    flexShrink: 0,
  },
  drawerPaper: {
    [theme.breakpoints.up('lg')]: {
      width: drawerWidth,
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    ...theme.mixins.toolbar,
    textAlign: 'center',
  },
  content: {
    flexGrow: 1,
  },
  footer: {
    width: '100%',
    position: 'fixed',
    bottom: 0,
    zIndex: 1,
  },
}))

export default useStyles

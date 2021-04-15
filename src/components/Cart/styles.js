import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: '2%',
  },
  emptyButton: {
    minWidth: '150px',
    [theme.breakpoints.down('xs')]: {
      marginBottom: '5px',
    },
    [theme.breakpoints.up('xs')]: {
      marginRight: '20px',
    },
  },
  checkoutButton: {
    minWidth: '150px',
  },
  link: {
    textDecoration: 'none',
    fontWeight: 'bold',
    color: '#1F9CB7'
  },
  cardDetails: {
    display: 'flex',
    marginTop: '5%',
    marginBottom: '5%',
    width: '100%',
    justifyContent: 'space-between',
  },
}));
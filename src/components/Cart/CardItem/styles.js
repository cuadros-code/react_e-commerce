import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    // height: '460px',
  },
  media: {
    height: '190px',
    backgroundSize: 'contain'
  },
  cardContent: {
    // display: 'flex',
    justifyContent: 'space-between',
  },
  cartActions: {
    justifyContent: 'space-between',
  },
  buttons: {
    display: 'flex',
    alignItems: 'center',
  },
}));
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  card: {
    // height: '460px',
  },
  media: {
    height: '100px',
    objectFit: 'cover',
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    display: 'flex',
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
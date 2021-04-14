import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'


import useStyles from './styles'

const CartItem = ({ cart: item }) => {

  const classes = useStyles()

  return (
    <Card className={classes.card} >
      <CardMedia image={item?.media?.source} className={classes.media} alt={item.name} />
      <CardContent
        className={classes.cardContent}
      >
        <Typography variant="subtitle2">{item?.name}</Typography>
        <Typography variant="h6">{item?.line_total?.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions
        className={classes.cartActions}
      >
        <div className={classes.buttons}>
          <Button type="button" size="small" >-</Button>
          <Typography>{item?.quantity}</Typography>
          <Button type="button" size="small" >+</Button>
        </div>
        <Button type="button" variant="contained" size="small" color="secondary" >Remove</Button>
      </CardActions>
    </Card>
  )
}

export default CartItem

import { Container, Typography, Button, Grid } from '@material-ui/core'
import { useEffect, useState } from 'react'
import CartItem from './CardItem/CartItem'
import useStyles from './styles'

const Cart = ({ cart }) => {
  const classes = useStyles()

  const [isEmptyCart, setIsEmptyCart] = useState(true)
  useEffect(() => {
    setIsEmptyCart(!cart?.line_items?.length)
  }, [cart])


  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">You have no items in your shopping card, start adding some!</Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
        <Grid container spacing={3}>
          {
            cart?.line_items?.map(item => (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem cart={item} />
              </Grid>
            ))
          }
        </Grid>
        <div className={classes.cardDetails} >
          <Typography
            variant="h5"
          >
            SubTotal: {cart?.subtotal?.formatted_with_symbol}
          </Typography>
          <div>
            <Button
              className={classes.emptyButton}
              size="large"
              type="button"
              variant="contained"
              color="secondary"
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
            >
              Checkout
            </Button>
          </div>
        </div>
      </>
    )
  }

  return (
    <Container>
      <div className={classes.toolbar} />
      <Typography className={classes.title} gutterBottom variant="h3">Your Shopping Cart</Typography>
      { isEmptyCart ? <EmptyCart /> : <FilledCart />}
    </Container>
  )
}

export default Cart

import { useContext, useEffect, useState } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import CartItem from './CardItem/CartItem'
import useStyles from './styles'
import { ContextCart } from '../../context/Cart/StateCart'
import styled from 'styled-components'

const Cart = () => {
  const classes = useStyles()

  const { state: { cart, totalItems }, handleEmptyCart } = useContext(ContextCart)
  const [isEmptyCart, setIsEmptyCart] = useState(true)

  useEffect(() => {
    if (totalItems > 0) {
      setIsEmptyCart(false)
    } else {
      setIsEmptyCart(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalItems])



  const EmptyCart = () => {
    return (
      <Typography variant="subtitle1">
        You have no items in your shopping card,{' '}
        <Link to="/" className={classes.link} >start adding some!</Link>
      </Typography>
    )
  }

  const FilledCart = () => {
    return (
      <>
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
              onClick={handleEmptyCart}
            >
              Empty Cart
            </Button>
            <Button
              className={classes.checkoutButton}
              size="large"
              type="button"
              variant="contained"
              color="primary"
              component={Link} to="/checkout"
            >
              Checkout
            </Button>
          </div>
        </div>
        <Grid container spacing={3}>
          {
            cart?.line_items?.map(item => (
              <Grid item xs={12} sm={4} key={item.id}>
                <CartItem
                  cart={item}
                />
              </Grid>
            ))
          }
        </Grid>

      </>
    )
  }

  return (
    <ContainerCart>
      <div className={classes.toolbar} />
      <Typography className={classes.title} gutterBottom variant="h4">Your Shopping Cart</Typography>
      { isEmptyCart ? <EmptyCart /> : <FilledCart />}
    </ContainerCart>
  )
}

export default Cart

const ContainerCart = styled(Container)`
margin-bottom: 3rem;
`
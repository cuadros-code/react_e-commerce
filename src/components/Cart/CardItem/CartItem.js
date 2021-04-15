import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import useStyles from './styles'

const CartItem = ({ cart: item, handleRemoveFromCart, handleUpdateCartQty }) => {

  const history = useHistory()
  const classes = useStyles()

  const showDetailProduct = () => {
    history.push(`/product/${item.product_id}`)
  }

  return (
    <Card className={classes.card} >
      <ImageCard
        image={item?.media?.source}
        className={classes.media}
        alt={item.name}
        onClick={showDetailProduct}
      />
      <CardContent
        className={classes.cardContent}
      >
        <Typography variant="subtitle2">{item?.name}</Typography>
        <Typography variant="h6" color="primary" >{item?.line_total?.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions
        className={classes.cartActions}
      >
        <div className={classes.buttons}>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item?.quantity - 1)} >-</Button>
          <Typography>{item?.quantity}</Typography>
          <Button type="button" size="small" onClick={() => handleUpdateCartQty(item.id, item?.quantity + 1)} >+</Button>
        </div>
        <Button
          type="button"
          variant="contained"
          size="small"
          color="secondary"
          onClick={() => handleRemoveFromCart(item.id)}
        >
          Remove
          </Button>
      </CardActions>
    </Card>
  )
}

export default CartItem

const ImageCard = styled(CardMedia)`
  cursor: pointer;
`
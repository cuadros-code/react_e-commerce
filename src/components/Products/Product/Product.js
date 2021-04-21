import { Card, CardMedia, CardContent, CardActions, Typography, IconButton } from '@material-ui/core'
import { AddShoppingCart } from '@material-ui/icons'
import { useHistory } from 'react-router-dom'
import useStyles from './styles'
import styled from 'styled-components'
import { useContext } from 'react'
import { ContextCart } from '../../../context/Cart/StateCart'

const Product = ({ product }) => {
  const history = useHistory()
  const classes = useStyles()

  const { handleAddToCart } = useContext(ContextCart)

  const showDetailProduct = () => {
    history.push(`/product/${product.id}`)
  }



  return (
    <Card className={classes.root}
    >
      <ImageCard
        onClick={showDetailProduct}
        image={product.media.source}
        title={product.name}
      />
      <CardContent>
        <div className={classes.cardContent} >
          <NameProduct variant="subtitle1" gutterBottom  >
            {product.name}
          </NameProduct>
          <Typography variant="subtitle1" color="primary" >
            {product.price.formatted_with_symbol}
          </Typography>
        </div>
      </CardContent>
      <CardActions disableSpacing className={classes.cardActions}>
        <IconButton

          color="primary"
          aria-label="Add to Card"
          onClick={() => {
            handleAddToCart(product.id, 1)
          }}
        >
          <AddShoppingCart />
        </IconButton>
      </CardActions>
    </Card>
  )
}

export default Product

const ImageCard = styled(CardMedia)`
  height: 190px;
  cursor: pointer;
  margin-top: 5px;
  background-size: contain;
`
const NameProduct = styled(Typography)`
    overflow: hidden;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 1;
   -webkit-box-orient: vertical;
   margin-bottom: 10px;
`

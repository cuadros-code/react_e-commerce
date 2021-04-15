import React, { useEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DetailProduct from './components/DetailProduct/DetailProduct'
import { useCommerce } from './hooks/useCommerce'
import Checkout from './components/CheckoutForm/Checkout/Checkout'

const App = () => {

  const {
    cart,
    products,
    fetchCard,
    fetchProducts,
    getProductById,
    handleAddToCard,
    handleEmptyCart,
    handleRemoveFromCart,
    handleUpdateCartQty } = useCommerce()

  useEffect(() => {
    fetchProducts()
    fetchCard()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])



  return (
    <Router>
      <div>
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route exact path="/">
            <Products
              products={products}
              handleAddToCard={handleAddToCard}
            />
          </Route>
          <Route exact path="/cart">
            <Cart
              cart={cart}
              handleRemoveFromCart={handleRemoveFromCart}
              handleUpdateCartQty={handleUpdateCartQty}
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/product/:id">
            <DetailProduct
              getProductById={getProductById}
              handleAddToCard={handleAddToCard}
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
import React, { useContext, useEffect, useLayoutEffect } from 'react'
import Navbar from './components/Navbar/Navbar'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import DetailProduct from './components/DetailProduct/DetailProduct'
import Checkout from './components/CheckoutForm/Checkout/Checkout'
import Home from './screens/Home/Home'
import { ContextCart } from './context/Cart/StateCart'

const App = () => {

  const { fetchCard } = useContext(ContextCart)

  useLayoutEffect(() => {
    fetchCard()
  }, [])

  return (
    <Router>
      <div>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/cart">
            <Cart />
          </Route>
          <Route exact path="/checkout">
            <Checkout />
          </Route>
          <Route exact path="/product/:id">
            <DetailProduct />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
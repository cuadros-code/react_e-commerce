import React, { useEffect, useState } from 'react'
import { commerce } from './lib/commerce'
import Navbar from './components/Navbar/Navbar'
import Products from './components/Products/Products'
import Cart from './components/Cart/Cart'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

const App = () => {

  const [products, setProducts] = useState([])
  const [cart, setCard] = useState({})

  const fetchProducts = async () => {
    const { data } = await commerce.products.list()
    setProducts(data)
  }

  const fetchCard = async () => {
    const cart = await commerce.cart.retrieve()
    setCard(cart)
  }

  const handleAddToCard = async (productId, quantity) => {
    console.log(productId, quantity);
    const item = await commerce.cart.add(productId, quantity)
    setCard(item.cart)
  }

  useEffect(() => {
    fetchProducts()
    fetchCard()
  }, [])

  // console.log(card);

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
            <Cart cart={cart} />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App
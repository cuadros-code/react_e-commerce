import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import { StateCart } from './context/Cart/StateCart'
import { StateProduct } from './context/Product/StateProduct'

ReactDOM.render(
  <StateCart>
    <StateProduct>
      <App />
    </StateProduct>
  </StateCart>,
  document.getElementById('root')
)


import { createContext, useReducer } from "react"
import { ReducerCart } from "./ReducerCart"
import { commerce } from '../../lib/commerce'
import { cartTypes } from "../../typesContext/cart"

export const ContextCart = createContext()

export const StateCart = (props) => {

  const initialState = {
    cart: null,
    totalItems: null,
    itemsOnCart: null,
  }

  const [state, dispatch] = useReducer(ReducerCart, initialState)


  const fetchCard = async () => {
    const cart = await commerce.cart.retrieve()
    dispatch({
      type: cartTypes.getProductsOfCart,
      payload: cart
    })
  }

  const handleAddToCart = async (productId, quantity) => {
    const response = await commerce.cart.add(productId, quantity)
    dispatch({
      type: cartTypes.getProductsOfCart,
      payload: response?.cart
    })
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity })
    dispatch({
      type: cartTypes.getProductsOfCart,
      payload: response?.cart
    })
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId)
    dispatch({
      type: cartTypes.getProductsOfCart,
      payload: response?.cart
    })
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    dispatch({
      type: cartTypes.getProductsOfCart,
      payload: response?.cart
    })
  }

  return (
    <ContextCart.Provider
      value={{
        state,
        fetchCard,
        handleAddToCart,
        handleUpdateCartQty,
        handleRemoveFromCart,
        handleEmptyCart
      }}
    >
      {props.children}
    </ContextCart.Provider>
  )

}




import { useState } from 'react'
import { commerce } from '../lib/commerce'


export const useCommerce = () => {

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
    const response = await commerce.cart.add(productId, quantity)
    setCard(response.cart)
  }

  const handleUpdateCartQty = async (productId, quantity) => {
    const response = await commerce.cart.update(productId, { quantity })
    setCard(response.cart)
  }

  const handleRemoveFromCart = async (productId) => {
    const response = await commerce.cart.remove(productId)
    setCard(response.cart)
  }

  const handleEmptyCart = async () => {
    const response = await commerce.cart.empty()
    setCard(response.cart)
  }

  const getProductById = async (productId) => {
    if (!productId) return null
    const response = await commerce.products.retrieve(productId)
    return response
  }

  return {
    products,
    cart,
    handleAddToCard,
    getProductById,
    handleRemoveFromCart,
    handleUpdateCartQty,
    fetchProducts,
    fetchCard,
    handleEmptyCart
  }
}

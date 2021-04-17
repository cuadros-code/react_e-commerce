import { useEffect, useState } from 'react'
import { commerce } from '../lib/commerce'

export const useCommerce = () => {

  const [products, setProducts] = useState([])
  const [productsLimit, setProductsLimit] = useState([])
  const [cart, setCard] = useState({})

  // const fetchCard = async () => {
  //   const cart = await commerce.cart.retrieve()
  //   setCard(cart)
  // }

  // const handleAddToCard = async (productId, quantity) => {
  //   console.log(productId, quantity);
  //   const response = await commerce.cart.add(productId, quantity)
  //   setCard(response.cart)
  // }

  // const handleUpdateCartQty = async (productId, quantity) => {
  //   const response = await commerce.cart.update(productId, { quantity })
  //   setCard(response.cart)
  // }

  // const handleRemoveFromCart = async (productId) => {
  //   const response = await commerce.cart.remove(productId)
  //   setCard(response.cart)
  // }

  // const handleEmptyCart = async () => {
  //   const response = await commerce.cart.empty()
  //   setCard(response.cart)
  // }

  const getProductById = async (productId) => {
    if (!productId) return null
    const response = await commerce.products.retrieve(productId)
    return response
  }


  const getLastProduct = async (limit = 3) => {

    const url = new URL(
      "https://api.chec.io/v1/products"
    );

    let params = {
      "limit": limit.toString(),
    };
    Object.keys(params)
      .forEach(key => url?.searchParams?.append(key, params[key]));

    let headers = {
      "X-Authorization": process.env.REACT_APP_CHEC_PUBLIC_KEY,
      "Accept": "application/json",
      "Content-Type": "application/json",
    };

    const reponse = await fetch(url, {
      method: "GET",
      headers: headers,
    })

    const { data } = await reponse.json()
    setProductsLimit(data)
  }


}

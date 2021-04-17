import React, { createContext, useReducer } from 'react'
import { commerce } from '../../lib/commerce'
import { productTypes } from '../../typesContext/product'
import { ReducerProduct } from './ReducerProduct'

export const ContextProduct = createContext()

export const StateProduct = (props) => {

  const initialState = {
    products: null,
    lastProducts: null,
    error: null
  }

  const [state, dispatch] = useReducer(ReducerProduct, initialState)

  const getProducts = async () => {
    try {
      const { data } = await commerce.products.list()
      dispatch({
        type: productTypes.getProducts,
        payload: data
      })
    } catch (error) {
      console.log(error);
    }
  }

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

    dispatch({
      type: productTypes.getProductsLastProducts,
      payload: data
    })
  }


  return (
    <ContextProduct.Provider
      value={{
        state,
        getProducts,
        getLastProduct,
        getProductById
      }}
    >
      {props.children}
    </ContextProduct.Provider>
  )
}

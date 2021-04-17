import { productTypes } from "../../typesContext/product";

export const ReducerProduct = (state, action) => {

  switch (action.type) {
    case productTypes.getProducts:
      return {
        ...state,
        products: action?.payload
      }
    case productTypes.getProductsLastProducts:
      return {
        ...state,
        lastProducts: action?.payload
      }

    default:
      break;
  }

}

// const initialState = {
//   products: null,
    // lastProducts: null,
    // error: null
// }
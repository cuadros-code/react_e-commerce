import { cartTypes } from "../../typesContext/cart";

export const ReducerCart = (state, action) => {

  switch (action.type) {
    case cartTypes.getProductsOfCart:
      return {
        ...state,
        cart: action?.payload,
        totalItems: action?.payload?.total_items
      }
    default:
      return state;
  }

}

// const initialState = {
//   cart: null,
//   totalItems: null,
//   itemsOnCart: null,
// }
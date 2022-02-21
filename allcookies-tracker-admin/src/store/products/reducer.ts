import {initialState} from "./store"
import {EDIT_PRODUCT_ACTION, ProductState, ProductType, REMOVE_PRODUCT_ACTION, SET_ALL_PRODUCTS} from "./types"


export const productReducer = (state: ProductState = initialState, action: ProductType): ProductState => {
  switch (action.type) {
    case SET_ALL_PRODUCTS: {
      return {
        ...state,
        ...action.payload
      }
    }
    case REMOVE_PRODUCT_ACTION: {
      return {
        ...state,
        data: [...state.data.filter((item) => item.id !== action.payload)]
      }
    }
    case EDIT_PRODUCT_ACTION: {
      return {
        ...state,
        data: state.data.map((item) => {
          if(item.id !== action.payload.id) {
            return item
          }
          return {
            ...item,
            title: action.payload.title
          }
        })
      }
    }
    default:
      return state
  }
}

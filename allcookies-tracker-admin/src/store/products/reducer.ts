import { initialState } from "./store"
import { ProductState, ProductType, SET_ALL_PRODUCTS } from "./types"


export const productReducer = (state: ProductState = initialState, action: ProductType): ProductState => {
	switch (action.type) {
		case SET_ALL_PRODUCTS: {
           return {
            ...state,
            ...action.payload
           }
        }
		default:
			return state
	}
}
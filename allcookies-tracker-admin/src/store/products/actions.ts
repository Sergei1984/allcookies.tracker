import { ProductState, SetAllProductsAction, SET_ALL_PRODUCTS } from "./types"

export const setAllProductsAction = (payload: ProductState): SetAllProductsAction => {
	return {
		type: SET_ALL_PRODUCTS,
		payload
	}
}
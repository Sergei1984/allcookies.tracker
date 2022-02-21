import {
	ProductState,
	RemoveProductAction,
	REMOVE_PRODUCT_ACTION,
	SetAllProductsAction,
	SET_ALL_PRODUCTS,
	EDIT_PRODUCT_ACTION, EditProductAction, EditProductPayload
} from "./types"

export const setAllProductsAction = (payload: ProductState): SetAllProductsAction => {
	return {
		type: SET_ALL_PRODUCTS,
		payload
	}
}

export const editProductAction = (payload: EditProductPayload): EditProductAction => {
	return {
		type: EDIT_PRODUCT_ACTION,
		payload
	}
}

export const removeProductAction = (payload: number):RemoveProductAction => {
	return {
		type: REMOVE_PRODUCT_ACTION,
		payload
	}
}

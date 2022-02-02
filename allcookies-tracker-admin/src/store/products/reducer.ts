import { initialState } from "./store"
import { ProductState, ProductType, REMOVE_PRODUCT_ACTION, SET_ALL_PRODUCTS } from "./types"


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
		default:
			return state
	}
}
export interface Product {
    id: number;
    title: string;
    image_url: string;
    is_disabled: boolean;
    created_by: number;
    created_at: string;
    modified_by: number;
    modified_at: string;
    deleted_by: string | null;
    deleted_at: string | null;
    count: number;
    isShow: boolean;
}

export interface ProductState {
    total: number;
    data: Product[];
}

export interface CreateProduct {
    productName: string,
    urlPhoto: string,
    is_disabled: boolean
}

export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS';
export const REMOVE_PRODUCT_ACTION = 'REMOVE_PRODUCT_ACTION';
export const EDIT_PRODUCT_ACTION = 'EDIT_PRODUCT_ACTION';

export interface SetAllProductsAction  {
    type: typeof SET_ALL_PRODUCTS,
    payload: ProductState
}

export interface RemoveProductAction {
    type: typeof REMOVE_PRODUCT_ACTION,
    payload: number
}

export type EditProductPayload = Pick<Product, "id" | "title">

export interface EditProductAction {
    type: typeof EDIT_PRODUCT_ACTION,
    payload: EditProductPayload
}

export type ProductType = SetAllProductsAction | RemoveProductAction | EditProductAction;

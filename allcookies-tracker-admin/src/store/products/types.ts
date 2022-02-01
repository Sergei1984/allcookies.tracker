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
export const SET_ALL_PRODUCTS = 'SET_ALL_PRODUCTS'

export interface SetAllProductsAction  {
    type: typeof SET_ALL_PRODUCTS,
    payload: ProductState
}


export type ProductType = SetAllProductsAction
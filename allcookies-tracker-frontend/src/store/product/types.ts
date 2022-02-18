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
    remaining_quantity: number;
    order_quantity: number;
    isShow: boolean;
}

export interface ProductState {
    total: number;
    data: Product[];
    filteredData: Product[]
}
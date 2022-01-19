export interface Location {
    lat: number;
    lon: number;
}

export interface SellingPoint {
    id: number;
    title: string;
    description: string | null;
    address: string;
    location: Location;
    is_disabled: false;
    created_by: number;
    created_at: string;
    modified_by: number;
    deleted_by: string | null;
    deleted_at: string | null;
}

export interface SellingPointState {
    total: number;
    data: SellingPoint[];
    newSellingPoints: SellingPoint[];
    activityId: number | null;
}

export interface SellingPointData {
    location: Location,
    title: string
}

interface ProductToSending {
    product_id: number,
    quantity: number
}
export interface CheckSellingPointData {
    location: Location,
    time: Date,
    selling_point_id: number,
    products: ProductToSending[],
    images: any
}
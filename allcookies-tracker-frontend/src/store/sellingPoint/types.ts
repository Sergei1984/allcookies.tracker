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
}

export interface SellingPointData {
    location: Location,
    title: string
}
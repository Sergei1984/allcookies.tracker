export interface SellingPointModel {
  readonly id: number;
  title: string;
  description: string;
  address: string;
  location: SellingPointLocation;
  is_disabled: boolean;
  created_by: number;
  created_at: Date;
  modified_by: number;
  modified_at: Date;
  deleted_by: number | null;
  deleted_at: Date | null;
}

export interface SellingPointLocation {
  lat: number;
  lon: number;
}

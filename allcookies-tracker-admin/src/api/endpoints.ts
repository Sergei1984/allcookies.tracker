import { apiUrl } from "../utils";

// Selling points
export const SellingPoint = () => apiUrl(`/admin/selling-point/`);
export const SellingPoints = (skip: number, take: number, search?: string) =>
  apiUrl(
    `/admin/selling-point/?skip=${skip}&take=${take}&title=${
      search ? search : ""
    }`
  );
export const CreateSellingPoint = (id: string | number) =>
  apiUrl(`/admin/selling-point/${id}`);
export const SellingPointWithId = (id: string | number) =>
  apiUrl(`/admin/selling-point/${id}`);

// Profile
export const Profile = () => apiUrl(`/profile/me`);

// Auth
export const SignIn = () => apiUrl(`/auth/sign-in`);

// Product
export const Products = (skip: number, take: number, search?: string) =>
  apiUrl(
    `/admin/product/?skip=${skip}&take=${take}&title=${search ? search : ""}`
  );
export const Product = () => apiUrl(`/admin/product`);
export const ProductWithId = (id: string | number) =>
  apiUrl(`/admin/product/${id}`);

// User
export const Users = (skip: number, take: number, search?: string) =>
  apiUrl(
    `/admin/user-accounts/?skip=${skip}&take=${take}&name=${
      search ? search : ""
    }`
  );
export const User = () => apiUrl(`/admin/user-accounts`);

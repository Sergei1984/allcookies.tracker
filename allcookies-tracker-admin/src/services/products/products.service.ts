import axiosInstance from "../../api";
import { Products, ProductWithId, Product } from "../../api/endpoints";
import { CreateProduct } from "../../store/products/types";

interface IProductsService {
  getAllProducts: (skip: number, take: number, search?: string) => Promise<any>;
  createProduct: (data: CreateProduct) => Promise<any>;
  deleteProduct: (id: number) => Promise<any>;
  editProduct: (id: number, title: string) => Promise<any>;
}

class ProductsService implements IProductsService {
  public getAllProducts = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    return await axiosInstance.get(Products(skip, take, search), {});
  };
  public createProduct = async (data: CreateProduct) => {
    return await axiosInstance.post(Product(), {
      title: data.productName,
      image_url: data.urlPhoto,
      is_disabled: data.is_disabled,
    });
  };
  public deleteProduct = async (id: number) => {
    return await axiosInstance.delete(ProductWithId(id));
  };
  public editProduct = async (id: number, title: string) => {
    return await axiosInstance.patch(ProductWithId(id), {
      title: title,
      is_disabled: false,
    });
  };
}

export const ProductsAPI = new ProductsService();

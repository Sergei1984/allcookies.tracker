import { title } from "process";
import axiosInstance from "../../api";
import { CreateProduct } from "../../store/products/types";

class ProductsService {
  public getAllProducts = async (
    skip: number,
    take: number,
    search?: string
  ) => {
    return await axiosInstance.get(
      `/admin/product/?skip=${skip}&take=${take}&title=${search ? search : ""}`,
      {}
    );
  };

  public createProduct = async (data: CreateProduct) => {
    return await axiosInstance.post("/admin/product", {
      title: data.productName,
      image_url: data.urlPhoto,
      is_disabled: data.is_disabled,
    });
  };

  public deleteProduct = async (id: number) => {
    return await axiosInstance.delete(`/admin/product/${id}`)
  }

  public editProduct = async (id: number, title: string) => {
    return await axiosInstance.patch(`/admin/product/${id}`, {title: title, is_disabled: false})
  }
}

export const ProductsAPI = new ProductsService();

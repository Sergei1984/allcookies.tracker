import axiosInstance from "../shared/utils/axiosInstanceHelper";

export class Products {
 

    public getProducts = async () => {
        let response = await axiosInstance.get(`client/product`);
        return response.data;
    }
};

export const ProductsAPI = new Products();
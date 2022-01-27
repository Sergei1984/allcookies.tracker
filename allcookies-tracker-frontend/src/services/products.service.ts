import axiosInstance from "../shared/utils/axiosInstanceHelper";

export class Products {
 

    public getProducts = async (skip: number, take: number) => {
        let response = await axiosInstance.get(`client/product`, {
            params: {
                take: take,
                skip: skip
            }
        });
        return response.data;
    }
};

export const ProductsAPI = new Products();
import axiosInstance from "../shared/utils/axiosInstanceHelper";
import { SellingPointData } from "../store/sellingPoint/types";

export class SellingPoints {

    public getSellingPoints = async () => {
        let response = await axiosInstance.get(`client/selling-point`)
        return response.data;
    }

    public createSellingPoint = async (data: SellingPointData) => {
        let response = await axiosInstance.post('client/selling-point', data);
        return response.data;
    }
}

export const SellingPointsAPI = new SellingPoints();
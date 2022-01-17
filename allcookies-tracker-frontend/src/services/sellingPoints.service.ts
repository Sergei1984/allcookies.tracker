import axiosInstance from "../shared/utils/axiosInstanceHelper";
import { CheckSellingPointData, Location, SellingPointData } from "../store/sellingPoint/types";

export class SellingPoints {

    public getSellingPoints = async () => {
        let response = await axiosInstance.get(`client/selling-point`)
        return response.data;
    }

    public createSellingPoint = async (data: SellingPointData) => {
        let response = await axiosInstance.post('client/selling-point', data);
        return response.data;
    }

    public checkSellingPoint = async (data: CheckSellingPointData) => {
        let response  = await axiosInstance.post('client/activity/check-selling-point', data);
        return response.data;
    }

    public getNewSellingPoints = async (data: Location) => {
        let response = await axiosInstance.get(`/client/selling-point`, {
            params: {
              lat: data.lat,
              lon: data.lon
            }
        })
        return response.data;
    }

}

export const SellingPointsAPI = new SellingPoints();
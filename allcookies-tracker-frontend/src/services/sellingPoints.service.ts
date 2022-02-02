import axiosInstance from "../shared/utils/axiosInstanceHelper";
import { CheckSellingPointData, Location, SellingPointData } from "../store/sellingPoint/types";

export class SellingPoints {

    public getSellingPoints = async (skip: number, take: number) => {
        let response = await axiosInstance.get(`client/selling-point`, {
            params: {
                take: take,
                skip: skip
            }
        })
        return response.data;
    }

    public createSellingPoint = async (data: SellingPointData) => {
        console.log('data', data)
        let response = await axiosInstance.post('client/selling-point', data);
        return response.data;
    }

    public checkSellingPoint = async (data: CheckSellingPointData) => {
        let response  = await axiosInstance.post('client/activity/check-selling-point', data);
        console.log('asdasd', response.data)
        return response.data;
    }

    public getNewSellingPoints = async (data: Location) => {
        let response = await axiosInstance.get(`client/selling-point`, {
            params: {
              lat: data.lat,
              lon: data.lon
            }
        })
        return response.data;
    }

    public searchSellingPoint = async (title: string) => {
        let response = await axiosInstance.get(`client/selling-point`, {
            params: {
                title
            }
        });
        return response.data;
    }

}

export const SellingPointsAPI = new SellingPoints();
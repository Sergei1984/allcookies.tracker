import {ILogin, IResponse} from "../../store/auth/types";
import axios from "axios";

class AuthService {

	public signIn = async (body: ILogin): Promise<IResponse> => {
		try {
			const {data, status} = await axios.post('https://allcookies-tracker.a-dev.com/auth/sign-in', body, {});

			return {data, status};
		} catch (error: any) {
			if (axios.isAxiosError(error) && error.response) {
				console.log(error.response)
				return {data: error.response.data, status: error.response.status}
			}

			return error.message
		}
	}
}

export const AuthAPI = new AuthService();
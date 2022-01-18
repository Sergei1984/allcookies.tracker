import {ILogin} from "../../store/auth/types";
import axios from "axios";

class AuthService {

	public signIn = async (body: ILogin) => {
		return await axios.post('https://allcookies-tracker.a-dev.com/auth/sign-in', body, {});
	}
}

export const AuthAPI = new AuthService();
import axios from "axios";
import { SignInData } from "../store/user/types";

class AuthService {

    public signIn = async (data: SignInData) => {
        const response = await axios.post('https://allcookies-tracker.a-dev.com/auth/sign-in', data);
        return response.data;
    }
    
}

export const AuthAPI = new AuthService();
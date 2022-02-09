import axiosInstance from "../../api";
import { SignIn } from "../../api/endpoints";
import { ILogin } from "../../store/auth/types";

interface IAuthService {
  signIn: (body: ILogin) => Promise<any>;
}

class AuthService implements IAuthService {
  public signIn = async (body: ILogin) => {
    return await axiosInstance.post(SignIn(), body, {});
  };
}

export const AuthAPI = new AuthService();

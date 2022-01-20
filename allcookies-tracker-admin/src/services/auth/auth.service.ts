import axiosInstance from "../../api";
import { ILogin } from "../../store/auth/types";

class AuthService {
  public signIn = async (body: ILogin) => {
    return await axiosInstance.post("/auth/sign-in", body, {});
  };
}

export const AuthAPI = new AuthService();

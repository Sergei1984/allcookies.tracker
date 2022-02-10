export const setToken = (access_token: string, refresh_token: string = "") => {
  localStorage.setItem("access_token", access_token);
  localStorage.setItem("refresh_token", refresh_token);
};

export const getAccessToken = () => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = () => {
  return localStorage.getItem("refresh_token");
};

export const clearToken = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

class LocalStorageService {
  public setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
  };

  public getUser = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      return null;
    }

    return JSON.parse(user);
  };
  public removeUser = () => {
    localStorage.removeItem("user");
  };
  public signOut = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user");
  };
}

export default new LocalStorageService();

class LocalStorageService {
    private service: any;
  
    getService = () => {
      if (!this.service) {
        this.service = this;
        return this.service;
      }
      return this.service;
    };
  
    setToken = (access_token: string, refresh_token: string) => {
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
    };
  
    getAccessToken = () => {
      return localStorage.getItem("access_token");
    };
  
    getRefreshToken = () => {
      return localStorage.getItem("refresh_token");
    };
  
    clearToken = () => {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    };
  };
  
  export default new LocalStorageService();
import http from "../http-common";

class LoginDataService {
  getlogin(data) {
    return http.post("/login/readuser.php", data);

  }
}

export default new LoginDataService();
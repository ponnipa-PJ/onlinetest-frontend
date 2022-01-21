import http from "../http-common";

class UsersDataService {
    getUsers() {
    return http.get('/user/getstu.php');
  }
}

export default new UsersDataService();
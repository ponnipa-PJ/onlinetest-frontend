import http from "../../http-common";

class AuthDataService {
    login(data) {
        return http.post("/login/readuser.php", data)
        .then(response => {
          console.log(response.data);
          if (response.data) {
            localStorage.setItem('user', JSON.stringify(response.data));
          } 
  
          return response.data;
        });
    }
    logout() {
        localStorage.removeItem('user');
      }
}

export default new AuthDataService();
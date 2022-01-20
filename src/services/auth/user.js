import axios from 'axios';

const API_URL = 'http://localhost:8080/';

class UserService {
    getPublicContent() {
        return axios.get(API_URL + 'home');
      }
    
      getUserBoard() {
        return axios.get(API_URL + 'user');
      }
    
      getAdminBoard() {
        return axios.get(API_URL + 'admin');
      }
}

export default new UserService();
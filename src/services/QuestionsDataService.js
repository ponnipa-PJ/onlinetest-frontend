import http from "../http-common";

class QuestionsDataService {
    create(data) {
        return http.post("/questions/create.php", data);
      }
}

export default new QuestionsDataService();
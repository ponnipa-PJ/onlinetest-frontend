import http from "../http-common";

class QuestionsAnswersDataService {
    create(data) {
        return http.post("/questions_answers/create.php", data);
      }
}

export default new QuestionsAnswersDataService();
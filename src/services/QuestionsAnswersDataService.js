import http from "../http-common";

class QuestionsAnswersDataService {
    create(data) {
        return http.post("/questions_answers/create.php", data);
      }
      delete(question_id) {
        return http.post(`/questions_answers/delete.php?question_id=${question_id}`);
      }
}

export default new QuestionsAnswersDataService();
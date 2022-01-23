import http from "../http-common";

class QuestionsDataService {
  create(data) {
    return http.post("/questions/create.php", data);
  }
  getquestionandanswer(question_id) {
    return http.get(`/answers/getquestionandanswerbyquestionid.php?question_id=${question_id}`);
  }
  update(data) {
    return http.put("/questions/update.php", data);
  }
}

export default new QuestionsDataService();
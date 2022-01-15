import http from "../http-common";

class StuAnswersDataService {
  create(data) {
    return http.post("/stu_answers/createdstu_answer.php", data);
  }
  delete(question_id,stu_id) {
    return http.post(`/stu_answers/delete.php?question_id=${question_id}&stu_id=${stu_id}`);
  }
}

export default new StuAnswersDataService();
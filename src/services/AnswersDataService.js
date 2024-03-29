import http from "../http-common";

class AnswersDataService {
  create(data) {
    return http.post("/answers/create.php", data);
  }
  getquestionsandanswers(subject_id,stu_id) {
    return http.get(`/answers/getquestionandchoicestu.php?subject_id=${subject_id}&stu_id=${stu_id}`);
  }
  getquestionsandanswersadmin(subject_id,part_id) {
    return http.get(`/answers/getquestionandchoiceadmin.php?subject_id=${subject_id}&part_id=${part_id}`);
  }
  update(data) {
    return http.put("/answers/update.php", data);
  }
}

export default new AnswersDataService();
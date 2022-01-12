import http from "../http-common";

class AnswersDataService {
  getAll() {
    return http.get("/answers/read_answers.php");
  }

  getreadid(id) {
    return http.get(`/answers/read_answer_byquestion_id.php?question_id=${id}`);
  }
  
  getquestionsandanswers() {
    return http.get("/answers/getquestionandchoice.php");
  }

  create(data) {
    return http.post("/answers/create.php", data);
  }

  update(id, data) {
    return http.put(`/answers/update.php?id=${id}`, data);
  }

  delete(id) {
    return http.delete(`/answers/delete.php?id=${id}`);
  }

  deleteAll() {
    return http.delete(`/answers/deleteAll`);
  }

  findByTitle(title) {
    return http.get(`/answers/findByTitle?title=${title}`);
  }
}

export default new AnswersDataService();
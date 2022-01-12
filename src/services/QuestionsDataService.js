import http from "../http-common";

class QuestionsDataService {
  getAll() {
    return http.get("questions/read_questions.php");
  }

  getreadid(id) {
    return http.get(`questions/read_question_id.php?id=${id}`);
  }

  create(data) {
    return http.post("questions/create.php", data);
  }

  update(id, data) {
    return http.put(`questions/update.php?id=${id}`, data);
  }

  delete(id) {
    return http.delete(`questions/delete.php?id=${id}`);
  }

  deleteAll() {
    return http.delete(`questions/deleteAll`);
  }

  findByTitle(title) {
    return http.get(`questions/findByTitle?title=${title}`);
  }
}

export default new QuestionsDataService();
import http from "../http-common";

class SubjectsDataService {
  create(data) {
    return http.post("/subjects/create.php", data);
  }
  getAll() {
    return http.get("/subjects/read.php");
  }

  getsubjectbyid(id) {
    return http.get(`/subjects/getsubjectbyid.php?subject_id=${id}`);
  }

  getsubjectbystuid(id) {
    return http.get(`/subjects/getsubjectsbystuid.php?stu_id=${id}`);
  }
}

export default new SubjectsDataService();
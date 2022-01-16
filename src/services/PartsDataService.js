import http from "../http-common";

class PartsDataService {
  create(data) {
    return http.post("/parts/create.php", data);
  }
  getpartsbyid(subject_id,part_id) {
    return http.get(`/parts/getpartsbyid.php?subject_id=${subject_id}&part_id=${part_id}`);
  }
  getpartsbysubjectid(id) {
    return http.get(`/parts/getpartbysubjectid.php?subject_id=${id}`);
  }
}

export default new PartsDataService();
import http from "../http-common";

class PartsDataService {
  getpartsbysubjectid(id) {
    return http.get(`/parts/getpartbysubjectid.php?subject_id=${id}`);
  }
}

export default new PartsDataService();
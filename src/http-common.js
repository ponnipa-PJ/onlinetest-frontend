import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:8080/apis",
  // baseURL: "https://aqua-space.in.th/onlinetest/apis",

  headers: {
    "Content-type": "application/json",
  }
});
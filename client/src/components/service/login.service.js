import axios from "axios";
import { API_BASE_URL } from "../../constants";

export class UserService {
  getAllUsers() {
    return axios.get("/api/users").then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  create(user) {
    return axios.post("/api/user", user).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  log(user) {
    return axios.post("/api/user/login", user).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  } 
}

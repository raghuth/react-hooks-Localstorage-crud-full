import axios from "axios";
import { API_BASE_URL } from "../../constants";

export class ClientService {
  getAllClients() {
    return axios.get("api/client").then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  create(client) {
    return axios.post("/api/client/create", client).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  update(client) {
    console.log("client update :", client);
    return axios.put("/api/client/edit/" + client._id, client).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  delete(id) {
    return axios.delete("/api/client/delete/" + id).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }

  get(id) {
   console.log("this is single client ");
    return axios.get("/api/client/" + id).then((res) => {
      console.log("res :", res.data);
      return res.data;
    });
  }
}

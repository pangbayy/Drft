import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/users/",
});

class AuthService {
  login(email, password) {
    return api
      .post("login", {
        email,
        password,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }

        return res.data;
      });
  }

  signup(username, email, password, joinDate) {
    return api
      .post("signup", {
        username,
        password,
        email,
        joinDate,
      })
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("user", JSON.stringify(res.data.data.user));
        }
        return res.data;
      });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    localStorage.removeItem("user");
  }
}

export default new AuthService();

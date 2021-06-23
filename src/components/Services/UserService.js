import axios from "axios";

class UserService {
  async updateUser(name) {
    try {
      const res = await axios({
        method: "PATCH",
        url: "http://localhost:3000/api/v1/users/updateMe",
        data: {
          name,
        },
      });
      if (res.data.status === "success") {
        alert("success", "Data updated successfully!");
      }
    } catch (err) {
      alert("err", err.response.data.message);
    }
  }
}
export default new UserService();

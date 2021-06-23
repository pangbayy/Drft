import axios from "axios";

class JournalService {
  async postJournal(title, userId, content) {
    try {
      const res = await axios({
        method: "POST",
        url: "http://localhost:3000/api/v1/journals",
        data: {
          title,
          userId,
          content,
        },
      });
      if (res.data.status === "success") {
        alert("Saved!", "Journal created successfully!");
      }
    } catch (err) {
      alert("Error");
    }
  }

  async editJournal(title, author, date, content) {
    try {
      const res = await axios({
        method: "PATCH",
        url: "http://localhost:3000/api/v1/journals/:id",
        data: {
          title,
          author,
          content,
        },
      });
      if (res.data.status === "success") {
        alert("Saved!", "Journal updated successfully!");
      }
    } catch (err) {
      alert("Error", err.response.data.message);
    }
  }

  async getAllJournals() {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/journals",
      });
      if (res.data.status === "success") {
        return res.data;
      }
    } catch (err) {
      alert("Could not load journals.");
    }
  }
  async getAllWrittenJournals(userId) {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/journals/",
        data: {
          userId,
        },
      });
      if (res.data.status === "success") {
        return res.data;
      }
    } catch (err) {
      alert("Could not load written journals");
    }
  }
  async getAllCollectedJournals(userId) {
    try {
      const res = await axios({
        method: "GET",
        url: "http://localhost:3000/api/v1/journals/",
        data: {
          userId,
        },
      });
      if (res.data.status === "success") {
        return res.data;
      }
    } catch (err) {
      alert("Could not load collected journals");
    }
  }
}
export default new JournalService();

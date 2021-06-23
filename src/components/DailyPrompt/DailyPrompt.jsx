import React from "react";
import "./styles.css";
import axios from "axios";
import { Link } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/dailyPrompt/",
});

class DailyPrompt extends React.Component {
  constructor(props) {
    super(props);
    let dailyPrompt;
    this.state = {
      id: "",
      daily: "",
      user: this.props.user,
    };
    api.get("/").then((res) => {
      dailyPrompt = res.data.data.prompt[0].prompt;
      this.setState({ daily: dailyPrompt });
    });
  }
  render() {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const dt = new Date();
    const date = monthNames[dt.getMonth()] + "-" + dt.getDate();
    return (
      <div className="container-fluid">
        <section id="prompt">
          <div className="date">{date}</div>
          <div className="daily-prompt">
            <Link
              className="daily-prompt"
              to={{
                pathname: "./editor",
                state: {
                  title: this.state.daily,
                  user: this.state.user,
                },
              }}
            >
              {this.state.daily}
            </Link>
          </div>
        </section>
      </div>
    );
  }
}

export default DailyPrompt;

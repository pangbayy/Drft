import React from "react";
import "./styles.css";
import Card from "../Card/Card";
import Navigation from "../Navigation/Navigation";
import Footer from "../Footer/Footer";
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000/api/v1/dailyPrompt/",
});
class Write extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      onLogout: this.props.onLogout,
      daily: "",
    };

    api.get("/").then((res) => {
      const dailyPrompt = res.data.data.prompt[0].prompt;
      this.setState({ daily: dailyPrompt });
    });
  }

  render() {
    return (
      <section id="Write">
        <div className="container-fluid">
          <Navigation user={this.state.user} onLogout={this.state.onLogout} />
          <div className="row justify-content-center">
            <Card
              layout="write-col col col-lg-6 col-md-6 col-sm-12 "
              title="Free Journaling"
              content="Write without any prompts. "
              to={{
                pathname: "./editor",
                state: {
                  title: "Untitled",
                  user: this.state.user,
                  editable: true,
                },
              }}
            />
            <Card
              layout="write-col col col-lg-6 col-md-6 col-sm-12 "
              title="Daily Prompts"
              content="Practice self-reflection with short daily prompts. "
              to={{
                pathname: "./editor",
                state: {
                  title: this.state.daily,
                  user: this.state.user,
                  editable: true,
                },
              }}
            />
            {/* <Card
              layout="write-col col col-lg-6 col-md-6 col-sm-12"
              title="CBT - Ten Questions"
              content="Ten questions based on Cognitive Behavioral Therapy (CBT)
              to help you reframe a negative situation. "
            />
            <Card
              layout="write-col col col-lg-6 col-md-6 col-sm-12"
              title="ACT Worksheets"
              content="Worksheets inspired by Acceptance and Commitment Therapy(ACT)."
            /> */}
          </div>
        </div>
        <Footer />
      </section>
    );
  }
}

export default Write;

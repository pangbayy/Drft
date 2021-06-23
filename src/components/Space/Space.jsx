import React from "react";
import "./styles.css";

import Navigation from "../Navigation/Navigation";
import DailyPrompt from "../DailyPrompt/DailyPrompt";
import Waterfall from "../Waterfall/Waterfall";

class Space extends React.Component {
  render() {
    return (
      <div className="container-fluid" id="space-container">
        <Navigation user={this.props.user} onLogout={this.props.onLogout} />
        <DailyPrompt user={this.props.user} onLogout={this.props.onLogout} />
        <Waterfall />
      </div>
    );
  }
}

export default Space;

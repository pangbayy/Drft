import React from "react";
import "./styles.css";

import Navigation from "../Navigation/Navigation";
import User from "../User/User";
import Footer from "../Footer/Footer";

class Me extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: this.props.user,
      onLogout: this.props.onLogout,
    };
  }
  render() {
    return (
      <section id="me">
        <div className="container-fluid">
          <Navigation user={this.state.user} onLogout={this.state.onLogout} />
          <User user={this.props.user} onLogout={this.state.onLogout} />
          <Footer />
        </div>
      </section>
    );
  }
}

export default Me;

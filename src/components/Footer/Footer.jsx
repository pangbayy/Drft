import React from "react";
import "./styles.css";

class Footer extends React.Component {
  render() {
    const date = new Date();
    const year = date.getFullYear();

    return (
      <div className="footer">
        <p>© Copyright {year} Bei Pang</p>
      </div>
    );
  }
}

export default Footer;

import React from "react";
import "./styles.css";

class Button extends React.Component {
  render() {
    return (
      <button onClick={this.props.onClick} className="btn btn-red text-center">
        {this.props.text}
      </button>
    );
  }
}

export default Button;

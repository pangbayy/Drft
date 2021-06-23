import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class Card extends React.Component {
  render() {
    const { layout, title, content, to } = this.props;
    return (
      <div className={layout}>
        <div className="card">
          <div className="card-body">
            <div className="card-title">{title}</div>
            <div className="card-text">
              <Link className="card-link" to={to}>
                {content}
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;

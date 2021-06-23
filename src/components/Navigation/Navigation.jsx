import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

class Navigation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      this.setState({
        user: this.props.user,
      });
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar  navbar-light navbar-expand-lg navbarstyle='background-color:#e3f2fd;'">
          <div className="container-fluid">
            <div className="navbar-brand">Drft</div>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              {this.state.user ? (
                <ul className="navbar-nav ms-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="./space">
                      <p>Space</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to="./write">
                      <p>Write</p>
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link className="nav-link" to="./me">
                      <p>Me</p>
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className="nav-link"
                      to="./signin"
                      onClick={this.props.onLogout}
                    >
                      <p>Logout</p>
                    </Link>
                  </li>
                </ul>
              ) : (
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="nav-link" to="./signin">
                      <p>Signin</p>
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </nav>
      </div>
    );
  }
}

export default Navigation;

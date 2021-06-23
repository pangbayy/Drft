import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import AuthService from "../Services/AuthService";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import "./styles.css";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.createUser = this.createUser.bind(this);
    const joinDate = Date();
    this.state = {
      username: "",
      email: "",
      password: "",
      successful: false,
      message: "",
      joinDate: joinDate,
    };
  }

  createUser = (e) => {
    e.preventDefault();

    AuthService.signup(
      this.state.username,
      this.state.email,
      this.state.password,
      this.state.joinDate
    )
      .then((res) => {
        this.props.history.push("./space");
        window.location.reload();
        this.setState({
          message: res.message,
          successful: true,
        });
      })
      .catch((err) => {
        // const resMessage = err.message;
        const resMessage =
          "Signup Failed. If you already have an account, please login instead";
        this.setState({
          successful: false,
          message: resMessage,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section id="signup">
        <div className="paper">
          <Avatar className="avatar"></Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className="form" onSubmit={this.createUser}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoFocus
              onChange={this.handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={this.handleChange}
            />

            {this.state.message && (
              <div className="form-group">
                <div
                  className={
                    this.state.successful
                      ? "alert alert-success"
                      : "alert alert-danger"
                  }
                  role="alert"
                >
                  {this.state.message}
                </div>
              </div>
            )}

            <Grid container>
              <Grid item className="signin-link">
                <Link to="./signin" variant="body2" id="signin-link">
                  {"Have an account? Signin"}
                </Link>
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              Sign up
            </Button>
          </form>
        </div>
      </section>
    );
  }
}

export default Signup;

import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import AuthService from "../Services/AuthService";
import "./styles.css";

export default class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);

    this.state = {
      email: "",
      password: "",
    };
  }

  login = (e) => {
    e.preventDefault();
    this.setState({
      message: "",
      loading: true,
    });

    AuthService.login(this.state.email, this.state.password)
      .then(() => {
        this.props.history.push("./space");
        window.location.reload();
      })
      .catch((err) => {
        const resMessage = err.message;
        this.setState({
          loading: false,
          message: resMessage,
        });
      });
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <section id="signin">
        <div className="paper">
          <Avatar className="avatar"></Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className="form" onSubmit={this.login}>
            <TextField
              variant="outlined"
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
              variant="outlined"
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
                <div className="alert alert-danger" role="alert">
                  {this.state.message}
                </div>
              </div>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className="submit"
            >
              Sign In
            </Button>

            <Grid container>
              <Grid item className="signup-link">
                <Link to="./signup" variant="body2" id="signup-link">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
      </section>
    );
  }
}

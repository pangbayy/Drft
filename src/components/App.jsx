import React from "react";
import "./App.css";
import { Route, Switch, BrowserRouter } from "react-router-dom";

/* Components */
import Write from "./Write/Write";
import Space from "./Space/Space";
import Me from "./Me/Me";
import Signup from "./Signup/Signup";
import Signin from "./Signin/Signin";
import Input from "./Input/Input";
import AuthService from "./Services/AuthService";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: AuthService.getCurrentUser(),
    };
    this.logout = this.logout.bind(this);
  }

  logout() {
    this.setState({
      currentUser: undefined,
    });
    AuthService.logout();
  }
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route
              // if logged in go to space, otherwise go to sigin page
              exact
              path={["/", "/space", "/signin"]}
              render={(props) => (
                <div className="app">
                  {!this.state.currentUser ? (
                    <Signin {...props} />
                  ) : (
                    <Space
                      user={this.state.currentUser}
                      onLogout={this.logout}
                    />
                  )}
                </div>
              )}
            />
            <Route
              // if logged in go to Space, otherwise signup
              exact
              path="/signup"
              render={(props) => (
                <div className="app">
                  {!this.state.currentUser ? (
                    <Signup {...props} />
                  ) : (
                    <Space
                      user={this.state.currentUser}
                      onLogout={this.logout}
                    />
                  )}
                </div>
              )}
            />
            <Route
              exact
              path="/me"
              render={(props) => (
                <div className="app">
                  {!this.state.currentUser ? (
                    <Signin {...props} />
                  ) : (
                    <Me user={this.state.currentUser} onLogout={this.logout} />
                  )}
                </div>
              )}
            />

            <Route
              exact
              path="/write"
              render={(props) => (
                <div className="app">
                  {!this.state.currentUser ? (
                    <Signin {...props} />
                  ) : (
                    <Write
                      user={this.state.currentUser}
                      onLogout={this.logout}
                    />
                  )}
                </div>
              )}
            />
            <Route
              exact
              path="/editor"
              render={(props) => (
                <div className="app">
                  {!this.state.currentUser ? (
                    <Signin {...props} />
                  ) : (
                    <Input
                      {...props}
                      user={this.state.currentUser}
                      onLogout={this.logout}
                    />
                  )}
                </div>
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;

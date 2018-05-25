// @flow

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  withRouter,
  Redirect
} from "react-router-dom";
import { Button } from "semantic-ui-react";

import { Login, Signup, Dashboard, AllTransactions } from "./pages";
import PrivateRoute from "./routing/PrivateRoute";
import type { User } from "./services/api";
import * as api from "./services/api";

type State = {
  isAuthenticated: boolean,
  token: ?string,
  user: ?User
};

class App extends React.Component<{}, State> {
  constructor(props: any) {
    super(props);
    const token = sessionStorage.getItem("token");
    const user = sessionStorage.getItem("user");
    if (token && user) {
      this.state = {
        isAuthenticated: true,
        token,
        user: JSON.parse(user)
      };
    } else {
      this.state = {
        isAuthenticated: false,
        token: undefined,
        user: undefined
      };
    }
  }

  authenticate = (
    login: string,
    password: string,
    cb: (error: ?Error) => void
  ) => {
    api
      .login(login, password)
      .then(({ token, owner }) => {
        this.setState({ isAuthenticated: true, token, user: owner });
        sessionStorage.setItem("token", token);
        sessionStorage.setItem("user", JSON.stringify(owner));
        cb(null);
      })
      .catch(error => cb(error));
  };

  signout = (callback: () => void) => {
    this.setState({
      isAuthenticated: false,
      token: undefined,
      user: undefined
    });
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    callback();
  };

  render() {
    const { isAuthenticated, user, token } = this.state;

    const MenuBar = withRouter(({ history, location: { pathname } }) => {
      if (isAuthenticated && user) {
        return (
          <nav>
            <div className="navigation-targets">
              <h2>Red Bank of North Koreact</h2>
              <NavLink to="/dashboard">Kontoübersicht</NavLink>
              <NavLink to="/transactions">Zahlungen</NavLink>
            </div>
            <div className="navigation-actions">
              <Button
                className="button-logout"
                onClick={event => {
                  event.preventDefault();
                  this.signout(() => history.push("/login"));
                }}
              >
                {user.firstname} {user.lastname} abmelden
              </Button>
            </div>
          </nav>
        );
      } else {
        return null;
      }
    });

    return (
      <Router>
        <div>
          <MenuBar />
          <Redirect exact path="/" to="dashboard" />
          <Route
            path="/login"
            render={props => (
              <Login {...props} authenticate={this.authenticate} />
            )}
          />
          <Route path="/signup" component={Signup} />
          <PrivateRoute
            path="/dashboard"
            isAuthenticated={isAuthenticated}
            token={token}
            component={Dashboard}
          />
          <PrivateRoute
            path="/transactions"
            isAuthenticated={isAuthenticated}
            token={token}
            user={user}
            component={AllTransactions}
          />
        </div>
      </Router>
    );
  }
}

export default App;

// @flow
import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import type State from '../../services/auth';
import { validate, defaultState, signout } from '../../services/auth';
import './PageHeader.css';

type Props = {
  // empty
};

export default class PageHeader extends React.Component<Props, State> {
  state: State = defaultState();

  componentWillMount() {
    validate((s) => {
      this.setState(s);
    });
  }

  render() {
    const { isAuthenticated, user } = this.state;
    const MenuBar = withRouter(({ history }) => {
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
                onClick={(event) => {
                  event.preventDefault();
                  signout((newState) => {
                    this.setState(newState);
                    history.push('/login');
                  });
                }}
              >
                {user.firstname} {user.lastname} abmelden
              </Button>
            </div>
          </nav>
        );
      }
      return <h1>Red Bank of North Koreact</h1>;
    });

    return <MenuBar />;
  }
}

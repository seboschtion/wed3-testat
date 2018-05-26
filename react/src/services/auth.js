// @flow
import type { User } from './services/api';
import * as api from './api';

export type State = {
  isAuthenticated: boolean,
  token: ?string,
  user: ?User,
};

export function defaultState(): State {
  return {
    isAuthenticated: false,
    token: undefined,
    user: undefined,
  };
}

export function signout(callback: (newState: State) => void) {
  sessionStorage.removeItem('token');
  sessionStorage.removeItem('user');
  callback({
    isAuthenticated: false,
    token: undefined,
    user: undefined,
  });
}

export function authenticate(
  login: string,
  password: string,
  callback: (state: State) => void,
  errorCallback: (error: Error) => void,
) {
  api
    .login(login, password)
    .then(({ token, owner }) => {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('user', JSON.stringify(owner));
      callback({ isAuthenticated: true, token, user: owner });
    })
    .catch(error => errorCallback(error));
}

export function validate(callback: (newState: State) => void) {
  const token = sessionStorage.getItem('token');
  const user = sessionStorage.getItem('user');
  if (token && user) {
    callback({
      isAuthenticated: true,
      token,
      user: JSON.parse(user),
    });
  } else {
    callback({
      isAuthenticated: false,
      token: undefined,
      user: undefined,
    });
  }
}

export function getToken(callback: (token: string) => void) {
  const token = sessionStorage.getItem('token');
  callback(token);
}

export function getUser(callback: (user: User) => void) {
  const user = sessionStorage.getItem('user');
  callback(user);
}

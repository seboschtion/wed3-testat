const TOKEN_KEY = "token";

class Auth {

  get token() {
    return localStorage.getItem(TOKEN_KEY);
  }

  set token(token) {
    localStorage.setItem(TOKEN_KEY, token);
  }

  isAuthenticated = () => this.token !== null && this.token !== '';
}

const Authentication = new Auth();

export default Authentication;

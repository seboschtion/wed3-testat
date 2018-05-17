
class Auth {
  token = '';
  owner = null;

  isAuthenticated = () => this.token !== null && this.token !== '';
}

const Authentication = new Auth();

export default Authentication;

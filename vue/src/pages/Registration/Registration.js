import { signup } from '../../services/Api';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      passwordConfirmation: '',
    };
  },
  methods: {
    register(event) {
      event.preventDefault();
      if (this.password !== this.passwordConfirmation) { return; }
      signup(this.username, this.firstname, this.lastname, this.password);
    },
  },
};

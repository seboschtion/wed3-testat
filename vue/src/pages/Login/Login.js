import Title from '../../components/Title/Title.vue';
import Input from '../../components/Input/Input.vue';
import Auth from '../../services/Auth';
import { login } from '../../services/Api';

export default {
  components: {
    Title, Input,
  },

  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },

  methods: {
    login(event) {
      event.preventDefault();
      if (!this.username) { this.errorMessage = 'Benutzername ungültig'; return; }
      if (!this.password || this.password.length < 3) { this.errorMessage = 'Passwort ungültig'; return; }
      this.errorMessage = '';

      login(this.username, this.password).then((response) => {
        Auth.token = response.token;
        Auth.owner = response.owner;
        this.$router.push('/dashboard');
      }).catch(e => this.errorMessage = 'Login fehlgeschlagen');
    },
  },
};

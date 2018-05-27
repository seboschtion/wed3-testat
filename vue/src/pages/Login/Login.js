import Title from '../../components/Title/Title.vue';
import Input from '../../components/Input/Input.vue';
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
      if (!this.validMinLength(this.username)) { this.errorMessage = 'Benutzername muss mindestens 3 Zeichen enthalten.'; return; }
      if (!this.password) { this.errorMessage = 'Passwort ungültig'; return; }
      if (!this.validMinLength(this.password)) { this.errorMessage = 'Passwort muss mindestens 3 Zeichen enthalten.'; return; }
      this.errorMessage = '';

      login(this.username, this.password)
        .then(() => this.$router.push('/dashboard'))
        .catch(() => { this.errorMessage = 'Login fehlgeschlagen'; });
    },
    validMinLength: value => value.length > 2,
  },
};

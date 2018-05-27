import Title from '../../components/Title/Title.vue';
import Input from '../../components/Input/Input.vue';
import { signup, login } from '../../services/Api';

export default {
  components: {
    Title, Input,
  },

  data() {
    return {
      firstname: '',
      lastname: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      errorMessage: '',
    };
  },

  methods: {
    register(event) {
      event.preventDefault();

      if (!this.firstname) { this.errorMessage = 'Bitte geben Sie einen Vornamen an'; return; }
      if (!this.validateMinLength(this.firstname)) {
        this.errorMessage = 'Vorname muss mindestens 3 Zeichen lang sein';
        return;
      }

      if (!this.lastname) { this.errorMessage = 'Bitte geben Sie einen Nachnamen an'; return; }
      if (!this.validateMinLength(this.lastname)) {
        this.errorMessage = 'Nachname muss mindestens 3 Zeichen lang sein';
        return;
      }

      if (!this.username) { this.errorMessage = 'Bitte geben Sie einen Benutzernamen an'; return; }
      if (!this.validateMinLength(this.username)) {
        this.errorMessage = 'Benutzername muss mindestens 3 Zeichen lang sein';
        return;
      }

      if (!this.password) { this.errorMessage = 'Das Passwort muss mindestens drei Zeichen lang sein'; return; }
      if (!this.validateMinLength(this.password)) {
        this.errorMessage = 'Passwort muss mindestens 3 Zeichen lang sein';
        return;
      }

      if (this.password !== this.passwordConfirmation) { this.errorMessage = 'Die Passwörter stimmen nicht überein'; return; }
      this.errorMessage = '';

      signup(this.username, this.firstname, this.lastname, this.password)
        .then(() => login(this.username, this.password)
          .then(() => this.$router.push('/dashboard'))
          .catch((e) => { this.errorMessage = e.toString(); }))
        .catch((e) => { this.errorMessage = e.toString(); });
    },
    validateMinLength: value => value.length > 2,
  },
};

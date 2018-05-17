import Title from '../../components/Title/Title.vue';
import Input from '../../components/Input/Input.vue';
import { signup } from '../../services/Api';

export default {
  components: {
    Title, Input
  },

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
      signup(this.username, this.firstname, this.lastname, this.password)
        .then(result => {
          this.$router.push('/login');
        });
    },
  },
};

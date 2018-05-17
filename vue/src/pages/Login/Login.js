import Title from '../../components/Title/Title.vue';
import Auth from '../../services/Auth';
import { login } from "../../services/Api";

export default {
  components: {
    Title
  },

  data() {
    return {
      username: '',
      password: '',
    };
  },

  methods: {
    login(event) {
      event.preventDefault();
      login(this.username, this.password).then(response => {
        Auth.token = response.token;
        Auth.owner = response.owner;
        this.$router.push('/dashboard');
      });
    },
  },
};

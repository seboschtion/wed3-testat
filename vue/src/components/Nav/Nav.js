import Auth from '../../services/Auth';

export default {
    methods: {
        logout() {
          Auth.token = null;
          Auth.owner = null;
          this.$router.push('/login');
        },
      },
}
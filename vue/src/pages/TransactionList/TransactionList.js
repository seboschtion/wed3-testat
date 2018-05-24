import Auth from '../../services/Auth';
import { getTransactions } from '../../services/Api';


export default {
  props: ['count'],

  data() {
    return {
      transactions: [],
      errorMessage: '',
    };
  },

  beforeMount() {
    const amountFetched = this.count ? this.count : 100;
    getTransactions(Auth.token, '', '', amountFetched).then(response => {
      this.transactions = response.result;
    }).catch(e => {
      this.errorMessage = e.toString();
    });
  },
};

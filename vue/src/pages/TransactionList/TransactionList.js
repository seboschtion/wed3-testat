import Auth from '../../services/Auth';
import { getTransactions } from '../../services/Api';


export default {
  props: ['count', 'yearFilter', 'monthFilter'],

  data() {
    return {
      transactions: [],
      errorMessage: '',
    };
  },

  methods: {
    getFilteredTransactions(year, month){
      year = parseInt(year);
      month = parseInt(month);

      return this.transactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const yearMatches = transactionDate.getFullYear() === year;
        const monthMatches = transactionDate.getMonth() === (month-1);
        return yearMatches && monthMatches;
      });
    },
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

import Moment from 'moment';
import Auth from '../../services/Auth';
import { getTransactions } from '../../services/Api';


export default {
  props: ['count', 'yearFilter', 'monthFilter', 'showCompleteList'],

  data() {
    return {
      transactions: [],
      errorMessage: '',
    };
  },

  methods: {
    getFilteredTransactions(year, month) {
      const yearNumber = parseInt(year, 10);
      const monthNumber = parseInt(month, 10);
      return this.transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        const yearMatches = !year || transactionDate.getFullYear() === yearNumber;
        const monthMatches = !month || transactionDate.getMonth() === (monthNumber - 1);
        return yearMatches && monthMatches;
      });
    },
    prettifyDate(dateString) {
      return Moment(dateString).format('DD.MM.YYYY');
    },
    fetchTransactions() {
      const amountFetched = this.count ? this.count : 100;
      getTransactions(Auth.token, '', '', amountFetched).then((response) => {
        this.transactions = response.result;
      }).catch((e) => {
        this.errorMessage = e.toString();
      });
    },
  },

  beforeMount() {
    this.$root.$on('refreshTransactions', () => {
      this.fetchTransactions();
    });
    this.fetchTransactions();
  },
};

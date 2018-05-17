import Auth from '../../services/Auth';
import { getAccountDetails } from '../../services/Api';

export default {
  data() {
    return {
      myAccountNumber: '',
      myBalance: 0.0,
      from: '',
      to: '',
      amount: 0.0,
    };
  },

  beforeMount(){
    getAccountDetails(Auth.token).then(response => {
      this.myAccountNumber = response.accountNr;
      this.myBalance = response.amount;
      this.from = `${this.myAccountNumber} [${this.myBalance} CHF]`;
    });
  }
};

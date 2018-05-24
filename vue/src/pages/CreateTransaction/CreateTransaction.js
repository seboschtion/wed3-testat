import Auth from '../../services/Auth';
import { getAccountDetails, getAccount } from '../../services/Api';

export default {
  data() {
    return {
      myAccountNumber: '',
      myBalance: 0.0,
      from: '',
      to: '',
      recipientName: '',
      amount: 0.0,
    };
  },

  methods: {
    loadAccount(target) {
      if (!target) {
        this.recipientName = '';
        return;
      }

      getAccount(target, Auth.token).then(response => {
        console.log(this.recipientName);
        this.recipientName = `${response.owner.firstname} ${response.owner.lastname}`;
      }).catch(e => {
        console.log(this.recipientName);
        this.recipientName = 'Account existiert nicht';
      });
    },
  },

  beforeMount(){
    getAccountDetails(Auth.token).then(response => {

      this.myAccountNumber = response.accountNr;
      this.myBalance = response.amount;
      this.from = `${this.myAccountNumber} [${this.myBalance} CHF]`;
    });
  },
};

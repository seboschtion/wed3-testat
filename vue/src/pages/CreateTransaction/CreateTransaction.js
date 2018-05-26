import Auth from '../../services/Auth';
import { getAccountDetails, getAccount, transfer } from '../../services/Api';
import Input from '../../components/Input/Input.vue';

const NO_ACC = 'Account existiert nicht';

export default {
  components: {
    Input,
  },

  data() {
    return {
      myAccountNumber: '',
      myBalance: 0.0,
      from: '',
      to: '',
      recipientName: '',
      amount: 0.0,
      errorMessage: '',
      transactionCompleted: false,
    };
  },

  methods: {
    loadAccount(target) {
      if (!target) {
        this.recipientName = '';
        return;
      }

      getAccount(target, Auth.token).then((response) => {
        this.recipientName = `${response.owner.firstname} ${response.owner.lastname}`;
      }).catch(() => {
        this.recipientName = NO_ACC;
      });
    },
    createTransaction() {
      if (!this.to || this.to === '' || this.recipientName === NO_ACC) { this.errorMessage = 'Geben Sie einen gültigen Empfänger ein.'; return; }
      if (!this.amount || this.amount === 0.0) { this.errorMessage = 'Geben Sie einen Betrag ein.'; return; }
      if (this.amount > this.myBalance) { this.errorMessage = 'Der Betrag darf den Kontostand nicht überschreiten.'; return; }
      if (this.amount < 0.05) { this.errorMessage = 'Der Betrag muss mindestens 5 Rappen betragen'; return; }
      this.errorMessage = '';

      transfer(this.to, this.amount, Auth.token).then((response) => {
        this.transactionCompleted = true;
        this.myBalance = response.total;
        this.$root.$emit('refreshTransactions');
      }).catch((e) => {
        this.errorMessage = e.toString();
      });
    },
    reset() {
      this.transactionCompleted = false;
      this.to = '';
      this.recipientName = '';
      this.amount = 0.0;
      this.errorMessage = '';
    },
  },

  beforeMount() {
    getAccountDetails(Auth.token).then((response) => {
      this.myAccountNumber = response.accountNr;
      this.myBalance = response.amount;
      this.from = `${this.myAccountNumber} [${this.myBalance} CHF]`;
    });
  },
};

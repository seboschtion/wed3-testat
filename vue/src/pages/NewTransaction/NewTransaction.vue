<template>

  <div class="overview">
    <div class="new-payment">
      <h3>Neue Zahlung</h3>
      <CreateTransaction></CreateTransaction>
    </div>

    <div class="newest-payments">
      <h3>Neueste Zahlungen</h3>
      <TransactionList count="3"></TransactionList>
      <router-link to="/dashboard/transaction-overview">Alle Zahlungen</router-link>
    </div>

  </div>

</template>

<script src="./NewTransaction.js"></script>
<style src="./NewTransaction.css"></style>

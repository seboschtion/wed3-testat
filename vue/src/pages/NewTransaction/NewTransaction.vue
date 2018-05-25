<template>

  <div>
    <h3>Neue Zahlung</h3>
    <CreateTransaction></CreateTransaction>

    <div>
      <h3>Neueste Zahlungen</h3>
      <TransactionList count="3"></TransactionList>
      <router-link to="/dashboard/transaction-overview">Alle Zahlungen</router-link>
    </div>

  </div>

</template>

<script src="./NewTransaction.js"></script>
<style src="./NewTransaction.css"></style>

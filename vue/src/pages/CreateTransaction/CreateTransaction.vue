<template>
  <div>
    <form v-if="transactionCompleted == false">
      <label>Von</label>
      <input disabled :value="myAccountNumber + ' [' + myBalance + ' CHF]' ">

      <label>An</label>
      <input v-model="to" v-on:input='loadAccount($event.target.value)'/>
      <p>{{recipientName}}</p>

      <label>Betrag</label>
      <input v-model="amount"/>

      <p>{{errorMessage}}</p>
      <button v-on:click="createTransaction()">Zahlung ausführen</button>
    </form>

    <div v-if="transactionCompleted == true">
      <p>Zahlung an {{to}} erfolgreich.</p>
      <p>Neuer Kontostand: {{myBalance}}</p>
      <button v-on:click="reset()">Neue Zahlung</button>
    </div>
  </div>
</template>

<script src="./CreateTransaction.js"></script>
<style src="./CreateTransaction.css"></style>

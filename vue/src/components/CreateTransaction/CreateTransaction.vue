<template>
  <div>
    <form v-if="transactionCompleted === false">
      <Input label="Von"
             disabled :value="myAccountNumber + ' [' + myBalance.toFixed(2) + ' CHF]' "/>

      <div class="input">
        <label>
          An
          <input v-model="to" v-on:input='loadAccount($event.target.value)'/>
        </label>
      </div>

      <p>{{recipientName}}</p>

      <Input label="Betrag" v-model="amount"/>

      <button v-on:click="createTransaction()">Zahlung ausführen</button>
      <Error :message="errorMessage"/>
    </form>

    <div v-if="transactionCompleted === true">
      <p>Zahlung an {{to}} erfolgreich.</p>
      <p>Neuer Kontostand: {{myBalance.toFixed(2)}} CHF</p>
      <button v-on:click="reset()">Neue Zahlung</button>
    </div>
  </div>
</template>

<script src="./CreateTransaction.js"></script>
<style src="./CreateTransaction.css"></style>

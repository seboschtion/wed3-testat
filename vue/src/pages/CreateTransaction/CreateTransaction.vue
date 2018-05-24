<template>
  <div>
    <h3>Neue Zahlung</h3>
    <form>
      <label>Von</label>
      <input disabled v-model="from"/>

      <label>An</label>
      <input v-model="to" v-on:input='loadAccount($event.target.value)'/>
      <p>{{recipientName}}</p>

      <label>Betrag</label>
      <input v-model="amount"/>

      <button>Zahlung ausführen</button>
    </form>
  </div>
</template>

<script src="./CreateTransaction.js"></script>
<style src="./CreateTransaction.css"></style>

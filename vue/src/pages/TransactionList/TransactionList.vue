<template>
  <div>

    <table>
      <thead>
        <tr>
          <th>Von</th>
          <th>An</th>
          <th>Betrag [CHF]</th>
          <th>Kontostand</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{transaction.from}}</td>
          <td>{{transaction.target}}</td>
          <td>{{transaction.amount}}</td>
          <td>{{transaction.total}}</td>
        </tr>
      </tbody>

    </table>

  </div>
</template>

<script src="./TransactionList.js"></script>
<style src="./TransactionList.css"></style>

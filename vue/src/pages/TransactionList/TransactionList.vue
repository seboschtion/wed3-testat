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
        <tr v-for="(transaction, index) in getFilteredTransactions(yearFilter, monthFilter)"
            :key="index">
          <td v-if="showCompleteList">{{prettifyDate(transaction.date)}}</td>
          <td>{{transaction.from}}</td>
          <td>{{transaction.target}}</td>
          <td>{{transaction.amount.toFixed(2)}}</td>
          <td>{{transaction.total.toFixed(2)}}</td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script src="./TransactionList.js"></script>
<style src="./TransactionList.css"></style>

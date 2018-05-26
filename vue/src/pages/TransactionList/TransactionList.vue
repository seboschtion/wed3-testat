<template>
  <div class="transaction-list">
    <table>
      <thead>
        <tr>
          <th v-if="showCompleteList">Datum</th>
          <th>Von</th>
          <th>An</th>
          <th>Betrag [CHF]</th>
          <th>Kontostand [CHF]</th>
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
          <td class="mobile">
            <p v-if="showCompleteList"><span>Datum</span>
              <span>{{prettifyDate(transaction.date)}}</span></p>
            <p><span>Von</span><span>{{transaction.from}}</span></p>
            <p><span>An</span><span>{{transaction.target}}</span></p>
            <p><span>Betrag [CHF]</span><span>{{transaction.amount.toFixed(2)}}</span></p>
            <p><span>Kontostand [CHF]</span><span>{{transaction.total.toFixed(2)}}</span></p>
          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script src="./TransactionList.js"></script>
<style src="./TransactionList.css"></style>

<template>
  <div>
    <div>
      <h4>Filter</h4>

      <p>Wähle ein Jahr</p>
      <select v-model="selectedYear">
        <option v-for="yearFilter in getYearFilters()" :value="yearFilter.value">
          {{yearFilter.text}}
        </option>
      </select>

      <p>Wähle einen Monat</p>
      <select v-model="selectedMonth">
        <option v-for="month in getMonthFilters()" :value="month.value">
          {{month.text}}
        </option>
      </select>
    </div>

    <TransactionList v-bind:yearFilter="selectedYear" v-bind:monthFilter="selectedMonth"></TransactionList>
  </div>
</template>

<script src="./TransactionOverview.js"></script>
<style src="./TransactionOverview.css"></style>

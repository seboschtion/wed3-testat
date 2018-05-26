<template>
  <div>
    <div>
      <h3>Zahlungsübersicht</h3>

      <p>Wähle ein Jahr</p>
      <select v-model="selectedYear">
        <option v-for="(yearFilter, index) in getYearFilters()"
                :value="yearFilter.value"
                :key="index">
          {{yearFilter.text}}
        </option>
      </select>

      <p>Wähle einen Monat</p>
      <select v-model="selectedMonth">
        <option v-for="(month, index) in getMonthFilters()"
                :value="month.value"
                :key="index">
          {{month.text}}
        </option>
      </select>
    </div>

    <TransactionList v-bind:yearFilter="selectedYear"
                     v-bind:monthFilter="selectedMonth"
                      showCompleteList="true"></TransactionList>
  </div>
</template>

<script src="./TransactionOverview.js"></script>
<style src="./TransactionOverview.css"></style>

<template>
  <div>
    <div>
      <h3>Zahlungsübersicht</h3>

      <div class="filter">
        <label>Filtere nach Jahr
          <select v-model="selectedYear">
            <option v-for="(yearFilter, index) in getYearFilters()"
                    :value="yearFilter.value"
                    :key="index">
              {{yearFilter.text}}
            </option>
          </select>
        </label>

        <label>und nach Monat
          <select v-model="selectedMonth">
            <option v-for="(month, index) in getMonthFilters()"
                    :value="month.value"
                    :key="index">
              {{month.text}}
            </option>
          </select>
        </label>
      </div>
    </div>

    <TransactionList v-bind:yearFilter="selectedYear"
                     v-bind:monthFilter="selectedMonth"
                      showCompleteList="true"></TransactionList>
  </div>
</template>

<script src="./TransactionOverview.js"></script>
<style src="./TransactionOverview.css"></style>

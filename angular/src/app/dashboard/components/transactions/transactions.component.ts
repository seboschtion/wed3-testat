import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'wed-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss']
})
export class TransactionsComponent implements OnInit {

  public selectedYear: number;
  public selectedMonth: number;

  constructor() { }

  ngOnInit() {
  }

  getYearFilters() {
    return [
      { text: "2018", value: 2018, key: 2018},
      { text: "2017", value: 2017, key: 2017},
      { text: "2016", value: 2016, key: 2016},
    ];
  }

  getMonthFilters() {
    return [
      { text: "Januar", value: 1, key: 1},
      { text: "Februar", value: 2, key: 2},
      { text: "März", value: 3, key: 3},
      { text: "April", value: 4, key: 4},
      { text: "Mai", value: 5, key: 5},
      { text: "Juni", value: 6, key: 6},
      { text: "Juli", value: 7, key: 7},
      { text: "August", value: 8, key: 8},
      { text: "September", value: 9, key: 9},
      { text: "Oktober", value: 10, key: 10},
      { text: "November", value: 11, key: 11},
      { text: "Dezember", value: 12, key: 12},
    ];
  }
}

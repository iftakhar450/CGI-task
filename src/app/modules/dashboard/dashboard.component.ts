import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { groupBy, sortBy, mean, round } from 'lodash';
import * as _moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tableColumns = ['machine_name', 'temperature', 'timestamp'];
  events: IMachine[] = [];
  filterEvents: IMachine[] = [];
  chartDataSubject = new BehaviorSubject<any[]>([]);
  chartData: Observable<any[]> = this.chartDataSubject.asObservable();
  selected: string = 'm';

  constructor(private route: ActivatedRoute) {
    this.events = this.route.snapshot.data.events[0];
  }

  ngOnInit(): void {
    this.arrangeEventData(this.events, this.selected);
    this.filterEvents = this.events.filter((e) => e.temperature >= 90);
  }

  /**
   * Group Button  change
   */
  optionChange() {
    this.arrangeEventData(this.events, this.selected);
    console.log(this.selected);
  }
  arrangeEventData(data: IMachine[], type: string) {
    // console.log(sortBy(data, ['timestamp'], ['asc']))
    let groupedData = groupBy(data, 'machine_name');
    let res = Object.keys(groupedData).map((ele: string) => {
      let obj = {
        name: ele,
        series: this.calculateAverage(
          this.reduceEventData(groupedData[ele], type)
        )
      };
      return obj;
    });

    this.chartDataSubject.next(res);
  }

  /**
   * Reduce the array on the basis of the type and return the
   * @param data
   * @param type
   * @returns
   */
  reduceEventData(data: IMachine[], type: string) {
    return data.reduce((acc, date) => {
      let key: string = '';
      if (type == 'w') {
        // console.log(`${_moment(date.timestamp).startOf('week')} - ${_moment(date.timestamp).endOf('week')} `);
        key = `${_moment(date.timestamp).year()}-week-${_moment(
          date.timestamp
        ).week()}`;
      }
      if (type == 'm') {
        key = `${_moment(date.timestamp).year()}-${_moment(
          date.timestamp
        ).format('MMM')}`;
      }
      if (type == 'y') {
        key = `${_moment(date.timestamp).year()}`;
      }
      // add this key as a property to the result object
      if (!acc[key]) {
        acc[key] = [];
      }
      // push the current date that belongs to the year-week calculated before
      acc[key].push(date.temperature);
      return acc;
    }, {});
  }

  /**
   * Calculate the average for each key array
   * @param data
   * @returns
   */
  calculateAverage(data) {
    return Object.keys(data).map((x: string) => {
      let obj = {
        name: x,
        value: round(mean(data[x]), 2)
      };
      return obj;
    });
  }
}

export interface IMachine {
  event_id: {
    $oid: string;
  };
  timestamp: string;
  machine_id: string;
  machine_name: string;
  temperature: number;
}

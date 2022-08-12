import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { groupBy, isArray, mean, round } from 'lodash';
import * as _moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  tableColumns = ['machine_name', 'temperature', 'timestamp'];
  events: any = [];
  filterEvents: any = [];
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
   * Dropdown menu change
   */
  optionChange() {
    this.arrangeEventData(this.events, this.selected);
    console.log(this.selected);
  }
  arrangeEventData(data: any, type: string) {
    let groupedData = groupBy(data, 'machine_name');
    let res = Object.keys(groupedData).map((ele) => {
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
  reduceEventData(data, type) {
    return data.reduce((acc: any, date: any) => {
      let key: string = '';
      if (type == 'w') {
        key = `${_moment(date.timestamp).year()}-${_moment(
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
  calculateAverage(data: any[]) {
    return Object.keys(data).map((x: any) => {
      let obj = {
        name: x,
        value: round(mean(data[x]), 2)
      };
      // obj[x] = ;
      return obj;
    });
  }
}

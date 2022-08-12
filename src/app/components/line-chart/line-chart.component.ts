import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import * as shape from 'd3-shape';
@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineChartComponent implements OnInit {
  @Input() data: Observable<any[]> | undefined;
  mySub: Subscription = new Subscription();
  constructor(private changeDetector: ChangeDetectorRef) {}

  ngOnInit(): void {}

  graphPoints: any[] = [];
  // view: any[] = [1000, 200];

  // options
  legend: boolean = true;
  legendPosition: string = 'below';
  showLabels: boolean = true;
  animations: boolean = true;
  gradient: boolean = true;
  xAxis: boolean = true;
  yAxis: boolean = true;
  showYAxisLabel: boolean = true;
  showXAxisLabel: boolean = true;
  xAxisLabel: string = 'Year';
  yAxisLabel: string = 'Average Temperature';
  timeline: boolean = false;
  curve = shape.curveBundle.beta(1);

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  ngAfterViewInit() {
    this.mySub = this.data!.subscribe(async (event) => {
      if (event) {
        console.log(event);
        this.graphPoints = event;
        this.changeDetector.detectChanges();
      }
    });
  }

  ngOnDestroy() {
    if (this.mySub) {
      this.mySub.unsubscribe();
    }
  }
}

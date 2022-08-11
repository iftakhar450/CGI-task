import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, Subscribable, Subscription } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit {

  displayedColumns: string[] = [];
  dataSource?: MatTableDataSource<any[]>
  mySub?: Subscription;

  @Input() data: any[] = [];
  @Input() isShowIcon: boolean = false;
  @Input() columns: string[] = [];

  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;

  constructor(private changeDetectorRef: ChangeDetectorRef,) {

  }

  ngOnInit(): void {

  }

  ngAfterViewInit() {
    this.displayedColumns = this.columns;
    this.dataSource = new MatTableDataSource(this.data);
    this.dataSource.paginator = this.paginator!;
    this.dataSource.sort = this.sort!;
    this.changeDetectorRef.detectChanges();

  }

  filter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource!.filter = filterValue;
  }

  ngOnDestroy() {
    if (this.mySub) {
      this.mySub.unsubscribe();
    }
  }
}

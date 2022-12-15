import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';

@Component({
  selector: 'app-table-queue',
  templateUrl: './table-queue.component.html',
  styleUrls: ['./table-queue.component.scss'],
})
export class TableQueueComponent implements OnInit {
  doctorId:any = null
  doctorList:any[] = []
  keyRange: any = 'toDay';
  keyRangeList: any[] = ['toDay', 'week', 'month', 'period'];

  queue: any[] = [];

  displayedColumns: string[] = [
    'no',
    'startDate',
    'customerName',
    'doctorName',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  constructor(
    private $queue: QueueHttpService,
    private $member: MemberHttpService
    ) {}

  async ngOnInit(): Promise<void> {
    this.doctorList = await this.$member.getDoctor().toPromise()
    this.onSelectRange();
  }

  async onSelectRange() {
    const foo: any = await this.getQueue();
    this.dataSource = new MatTableDataSource(foo);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  async getQueue() {
    if (this.keyRange) {
      let param: HttpParams = new HttpParams().set('doctorId', this.doctorId);
      if (this.keyRange == 'toDay') {
        const resQueue = await this.$queue.queueDay(param).toPromise();
        return resQueue;
      }
      if (this.keyRange == 'week') {
        const resQueue = await this.$queue.queueWeek(param).toPromise();
        return resQueue;
      }
      if (this.keyRange == 'month') {
        const resQueue = await this.$queue.queueMonth(param).toPromise();
        return resQueue;
      }
      if (this.keyRange == 'period') {
        if (this.range.valid) {
          const start: any = this.range.value.start?.toDateString();
          const end: any =  this.range.value.end?.toDateString();
          const paramDoc: HttpParams = new HttpParams().set(
            'doctorId',
            this.doctorId
          ).set('start', start).set('end', end)
          const resQueue = await this.$queue.queuePeriod(paramDoc).toPromise();
          return resQueue;
        }
        return [];
      }
    } else {
      return [];
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-table-queue',
  templateUrl: './table-queue.component.html',
  styleUrls: ['./table-queue.component.scss'],
})
export class TableQueueComponent implements OnInit {
  doctorId: any = null;
  doctorList: any[] = [];
  keyRange: any = 'toDay';
  keyRangeList: any[] = ['toDay', 'week', 'month', 'period'];

  queue: any[] = [];

  displayedColumns: string[] = [
    'no',
    'startDate',
    'customerName',
    'doctorName',
    'status',
    'action',
    'multiAction',
  ];
  dataSource!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });

  selectedItem: any;

  constructor(
    private $queue: QueueHttpService,
    private $member: MemberHttpService,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    this.doctorList = await this.$member.getDoctor().toPromise();
    this.onSelectRange();
  }

  async onSelectRange() {
    const foo: any = await this.getQueue();
    console.log(foo);

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
          const end: any = this.range.value.end?.toDateString();
          const paramDoc: HttpParams = new HttpParams()
            .set('doctorId', this.doctorId)
            .set('start', start)
            .set('end', end);
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

  htmlStatus(status: any) {
    if(status=='waitConfirm') return 'รอยืนยัน'
    if(status=='waitDoctor') return 'รอตรวจ'
    if(status=='next') return 'เลื่อนนัด'
    if(status=='cancel') return 'ยกเลิกนัด'
    if(status=='lost') return 'ไม่มานัด'
    if(status=='healed') return 'รักษาสำเร็จ'
    if(status=='finish') return 'สำเร็จ'
    return '';
  }

  async onApprove(item: any) {
    console.log(item);
    const body = {
      ...item,
      status: 'waitDoctor',
    };
    await this.$queue.update(body._id, body).toPromise();
    Swal.fire('SUCCESS', '', 'success');
    this.onSelectRange();
  }

  onClickMenu(item: any) {
    this.selectedItem = item;
  }
  onNext() {
    Swal.fire({
      title: `ต้องการเลื่อนนัดหรือไม่ ?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this._router.navigate(['reception/queue-detail'], {
          queryParams: {
            userId: this.selectedItem.customerId,
          },
        });
      }
    });
  }
  onNextNew(item:any) {
    Swal.fire({
      title: `ต้องการนัดครั้งหน้าหรือไม่ ?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.selectedItem  =item
        this._router.navigate(['reception/queue-detail'], {
          queryParams: {
            userId: this.selectedItem.customerId,
          },
        });
      }
    });
  }
  onCancel() {
    Swal.fire({
      title: `ต้องการยกเลิกนัดหรือไม่ ?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const body = {
          ...this.selectedItem,
          status: 'cancel',
        };
        await this.$queue.update(body._id, body).toPromise();
        Swal.fire('SUCCESS', '', 'success');
        this.onSelectRange();
      }
    });
  }
  async onLost() {

    Swal.fire({
      title: `อัพเดทคนไข้ไม่มาตามนัด ?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      if (value.isConfirmed) {
        const body = {
          ...this.selectedItem,
          status: 'lost',
        };
        await this.$queue.update(body._id, body).toPromise();
        Swal.fire('SUCCESS', '', 'success');
        this.onSelectRange();
      }
    });
   
  }
}

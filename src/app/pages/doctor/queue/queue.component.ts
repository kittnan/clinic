import { HttpParams } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {

  interval$!: Subscription;

  displayedColumns: string[] =[
    'id',
    'customerName',
    'doctorName',
    'startDate',
    'action',
  ]
  dataSource!: MatTableDataSource<any>;
  userLogin: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private $queue: QueueHttpService,
    private _router:Router
  ) {
    let session: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(session);
  }

  ngOnInit(): void {
    this.interval$ = interval(30000)
    .subscribe(res => this.getQueue());
    this.getQueue();
  }

  auto(){
    setTimeout(() => {
      
    }, 1000);
  }

  async getQueue() {
    const param: HttpParams = new HttpParams().set(
      'doctorId',
      this.userLogin._id
    );
    const resGet = await this.$queue.queueDay(param).toPromise();
    this.setTable(resGet);
  }

  private setTable(res: any) {
    this.dataSource = new MatTableDataSource(res);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  toLink(item:any){
    console.log(item);
    this._router.navigate(['doctor/heal'], {
      queryParams: {
        customerId: item.customerId,
        queueId:item._id
      },
    });
  }
}

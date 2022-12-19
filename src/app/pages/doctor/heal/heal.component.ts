import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { HistoryHealHttpService } from 'src/app/api/history-heal-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-heal',
  templateUrl: './heal.component.html',
  styleUrls: ['./heal.component.scss'],
})
export class HealComponent implements OnInit {
  checkupList: any;
  healList: any;
  sideList: any;
  description: any;

  customer: any;
  userLogin: any;
  queue: any;
  
  constructor(
    private _route: ActivatedRoute,
    private $customer: CustomerHttpService,
    private $checkup: CheckupHttpService,
    private $historyHeal: HistoryHealHttpService,
    private $queue: QueueHttpService
  ) {
    let session: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(session);
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params && params['customerId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['customerId']
        );
        this.customer = await this.$customer.getId(http_param).toPromise();
      }
      if (params && params['queueId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['queueId']
        );
        this.queue = await this.$queue.get(http_param).toPromise();
      }
    });

    this.getCheckupList();
  }

  private async getCheckupList() {
    this.checkupList = await this.$checkup.get().toPromise();
    this.filterHealList(this.checkupList);
    this.filterSideList(this.checkupList);
  }
  private filterHealList(checkupList: any) {
    if (checkupList && checkupList.length > 0) {
      this.healList = checkupList.filter((c: any) => c.groupType == 'heal');
    } else {
      this.healList = [];
    }
  }

  private filterSideList(checkupList: any) {
    if (checkupList && checkupList.length > 0) {
      this.sideList = checkupList.filter((c: any) => c.groupType == 'side');
    } else {
      this.sideList = [];
    }
  }

  checkHeal(healItem: any) {
    if (!healItem.checked) {
      healItem.items = healItem.items.map((item: any) => {
        return {
          ...item,
          checked: false,
        };
      });
    }
  }

  onSubmit() {
    Swal.fire({
      title: `ต้องการบันทึกหรือไม่ ?`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.submit();
      }
    });
  }

  async submit() {
    const insertForm = {
      customerId: this.customer._id,
      customerName: `${this.customer[0].titleName}${this.customer[0].firstName} ${this.customer[0].lastName}`,
      doctorId: this.userLogin._id,
      doctorName: `${this.userLogin.titleName}${this.userLogin.firstName} ${this.userLogin.lastName}`,
      healList: this.healList,
      sideList: this.sideList,
      description: this.description,
    };

    // const resInsert = await this.$historyHeal.add(insertForm).toPromise();
    // console.log(resInsert);
    console.log(this.queue);
    const updateQueueForm = {
      ...this.queue[0],
      endDate: new Date(),
      status:true
    }
    // const resUpdateQueue = await this.$queue.update(updateQueueForm._id,updateQueueForm).toPromise()
    // console.log();
    let arr:any[] =[]
    arr.push(
      await this.$historyHeal.add(insertForm).toPromise()
    )
    arr.push(
      await this.$queue.update(updateQueueForm._id,updateQueueForm).toPromise()
    )

    Promise.all(arr).then((value:any[])=>{
      console.log(value);
      
    })
    
  }
}

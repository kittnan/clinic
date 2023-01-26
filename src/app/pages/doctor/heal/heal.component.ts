import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { HistoryHealHttpService } from 'src/app/api/history-heal-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import { ToastService } from 'src/app/toast/toast.service';
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

  nextMeetStatus = true;
  nextMeet: any;

  prevHeal: any = null;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private $customer: CustomerHttpService,
    private $checkup: CheckupHttpService,
    private $historyHeal: HistoryHealHttpService,
    private $queue: QueueHttpService,
    private _toast: ToastService,
    private _loading: NgxUiLoaderService
  ) {
    let session: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(session);
  }

  ngOnInit(): void {
    this._loading.start();

    this._route.queryParams.subscribe(async (params) => {
      if (params && params['customerId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['customerId']
        );
        this.customer = await this.$customer.getId(http_param).toPromise();
        console.log(this.customer);
      }
      if (params && params['queueId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['queueId']
        );
        this.queue = await this.$queue.get(http_param).toPromise();
      }

      if (params && params['edit']) {
        console.log(params['edit']);
        if (params['edit'] == 'true' && params['edit']) {
          const param = new HttpParams().set(
            'customerId',
            this.customer[0]._id
          );
          const heal = await this.$historyHeal.customerId(param).toPromise();
          console.log(heal);
          this.prevHeal = heal;
          this.healList = heal[0].healList;
          this.sideList = heal[0].sideList;
          this.description = heal[0].description;
          console.log(this.queue);
          if (this.queue[0].status == 'healed') this.nextMeetStatus = true;
          if (this.queue[0].status == 'finish') this.nextMeetStatus = false;
        }
      }
    });

    this.getCheckupList();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
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
        if (this.prevHeal) {
          this.update();
        } else {
          this.submit();
        }
      }
    });
  }

  async update() {
    const body = {
      ...this.prevHeal[0],
      healList: this.healList,
      sideList: this.sideList,
      description: this.description,
    };
    await this.$historyHeal.update(body._id, body).toPromise();

    const updateQueueForm = {
      ...this.queue[0],
      endDate: new Date(),
      status: true,
    };
    if (this.nextMeetStatus) {
      updateQueueForm.status = 'healed';
      await this.$queue
        .update(updateQueueForm._id, updateQueueForm)
        .toPromise();
    } else {
      updateQueueForm.status = 'finish';
      await this.$queue
        .update(updateQueueForm._id, updateQueueForm)
        .toPromise();
    }
    Swal.fire('SUCCESS', '', 'success');
    setTimeout(() => {
      this._router.navigate(['/doctor']);
    }, 500);
  }

  validButton() {
    if (
      this.healList &&
      this.sideList &&
      this.healList.find((h: any) => h.checked) &&
      this.healList.find((h: any) => h.items.find((i: any) => i.checked)) &&
      this.sideList.find((h: any) => h.checked) &&
      this.sideList.find((h: any) => h.items.find((i: any) => i.checked))
    )
      return false;
    return true;
  }

  async submit() {
    const insertForm = {
      customerId: this.customer[0]._id,
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
      status: true,
    };
    // const resUpdateQueue = await this.$queue.update(updateQueueForm._id,updateQueueForm).toPromise()
    // console.log();
    let arr: any[] = [];
    arr.push(await this.$historyHeal.add(insertForm).toPromise());

    if (this.nextMeetStatus) {
      updateQueueForm.status = 'healed';
      arr.push(
        await this.$queue
          .update(updateQueueForm._id, updateQueueForm)
          .toPromise()
      );
    } else {
      updateQueueForm.status = 'finish';
      arr.push(
        await this.$queue
          .update(updateQueueForm._id, updateQueueForm)
          .toPromise()
      );
    }

    Promise.all(arr).then((value: any[]) => {
      console.log(value);
      Swal.fire('SUCCESS', '', 'success');
      setTimeout(() => {
        this._router.navigate(['/doctor']);
      }, 500);
    });
  }
}

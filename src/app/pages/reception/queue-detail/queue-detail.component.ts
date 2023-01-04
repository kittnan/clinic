import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss'],
})
export class QueueDetailComponent implements OnInit {
  userLogin: any;
  customer: any;
  selectedStatus: any = null;
  listStatus: any[] = [
    {
      name: 'รอตรวจ',
      value: 'waitDoctor',
    },
    {
      name: 'เลื่อนนัด',
      value: 'next',
    },
    {
      name: 'ยกเลิก',
      value: 'cancel',
    },
    {
      name: 'ไม่มา',
      value: 'lost',
    },
  ];

  queueForm = new FormGroup({
    _id: new FormControl(null),
    customerId: new FormControl(null, Validators.required),
    customerName: new FormControl('', Validators.required),
    doctorId: new FormControl(null, Validators.required),
    doctorName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null),
    updateBy: new FormControl(null, Validators.required),
    status: new FormControl(null, Validators.required),
  });
  date: any;
  time: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private $customer: CustomerHttpService,
    private $queue: QueueHttpService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params && params['userId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['userId']
        );
        const customer = await this.$customer.getId(http_param).toPromise();
        this.customer = customer[0];
        const param: HttpParams = new HttpParams().set(
          'customerId',
          this.customer._id
        );
        const queue = await this.$queue.queueDayCustomer(param).toPromise();
        console.log(queue);

        if (queue && queue.length === 0) {
          this.listStatus = [
            {
              name: 'นัดคิววันนี้',
              value: 'waitDoctor',
            },
            {
              name: 'นัดคิวครั้งถัดไป',
              value: 'waitConfirm',
            },
          ];
        }


        this.queueForm.patchValue({ ...queue[0] });

        if (queue && queue.length !== 0) {
          this.date = this.queueForm.value.startDate;
          const temp = moment(this.date).format('HH:mm');
          this.time = temp
          console.log(this.date,this.time);
          
        } else {
          this.date = new Date();
          const temp = moment(this.date).format('HH:mm');
          this.time = temp
          console.log(this.date,this.time);
        }
        this.userLogin = localStorage.getItem('userLogin');
        this.userLogin = JSON.parse(this.userLogin);
        this.queueForm.patchValue({
          updateBy: this.userLogin._id,
          customerId: this.customer._id,
          customerName: `${customer[0].titleName}${customer[0].firstName} ${customer[0].lastName}`,
        });

        // this.queueForm.patchValue({
        //   customerId: customer[0]._id,
        //   customerName: `${customer[0].titleName}${customer[0].firstName} ${customer[0].lastName}`,
        // });
      }
    });
  }

  onChangeStatus() {
    this.queueForm.patchValue({
      status: this.selectedStatus,
    });
    console.log(this.selectedStatus);
    if (this.selectedStatus == 'waitDoctor' && !this.queueForm.value._id) {
    }
  }

  emitQueue(e: any) {
    console.log(e);

    this.queueForm.patchValue({
      ...e,
    });
    console.log(this.queueForm.value);
  }

  submit() {
    console.log(this.queueForm.value);

    if (this.queueForm.value._id) {
      this.update();
    } else {
      this.create();
    }
  }
  update() {
    this.$queue.update(this.queueForm.value._id,this.queueForm.value).subscribe(res=>{
      console.log(res);
      if(res && res.acknowledged){
        Swal.fire('SUCCESS', '', 'success');
        setTimeout(() => {
         this._router.navigate(['reception/queue']);
       }, 1000);
      }else{

      }
    })
  }
  create() {
    const body = this.queueForm.value;
    delete body._id;
    this.$queue.add(body).subscribe((res) => {
      if (res && !res.error && res.length > 0) {
        Swal.fire('SUCCESS', '', 'success');
        setTimeout(() => {
         this._router.navigate(['reception/queue']);
       }, 1000);
      } else {
        Swal.fire(`มีคิว ${res.data[0].customerName} อยู่แล้ว`, '', 'error');
      }
    });
  }
}

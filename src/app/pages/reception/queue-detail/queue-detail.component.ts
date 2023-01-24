import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { LineHttpService } from 'src/app/api/line-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss'],
})
export class QueueDetailComponent implements OnInit {
  userLogin: any;
  customer: any;
  selectedStatus: any = null;
  listStatus: any[] = [];

  queueForm = new FormGroup({
    _id: new FormControl(null),
    customerId: new FormControl(null, Validators.required),
    customerName: new FormControl('', Validators.required),
    doctorId: new FormControl(null, Validators.required),
    doctorName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null),
    updateBy: new FormControl(null, Validators.required),
    status: new FormControl('', Validators.required),
  });
  prevQueue: any;
  date: any;
  time: any;
  min: any;
  max: any;
  constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private $customer: CustomerHttpService,
    private $queue: QueueHttpService,
    private $line: LineHttpService
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
        this.prevQueue = queue;
        const queueLast = queue?.length > 0 ? queue[queue.length - 1] : null;

        if (queueLast && queueLast.status == 'healed') {
          this.listStatus = [
            {
              name: 'นัดคิวครั้งถัดไป',
              value: 'next',
            },
          ];
        } else {
          if (queue && queue?.length > 0) {
            if (
              (queueLast && queueLast.status === 'finish') ||
              queueLast.status === 'cancel' ||
              queueLast.status === 'lost'
            ) {
              this.listStatus = [
                {
                  name: 'นัดคิววันนี้',
                  value: 'waitDoctor',
                },
                {
                  name: 'นัดคิวครั้งถัดไป',
                  value: 'next',
                },
              ];
            } else {
              if (queueLast && queueLast.status === 'waitConfirm') {
                this.listStatus = [
                  {
                    name: 'ยืนยันคิว',
                    value: 'waitDoctor',
                  },
                  {
                    name: 'นัดคิวครั้งถัดไป',
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
              }
              if (queueLast && queueLast.status === 'waitDoctor') {
                this.listStatus = [
                  {
                    name: 'นัดคิวครั้งถัดไป',
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
              }
            }
          } else {
            this.listStatus = [
              {
                name: 'นัดคิววันนี้',
                value: 'waitDoctor',
              },
              {
                name: 'นัดคิวครั้งถัดไป',
                value: 'next',
              },
            ];
          }
        }

        // if (queue && queue.length === 0) {
        // }else{
        //   this.listStatus
        // }

        this.queueForm.patchValue({ ...queue[0] });

        if (queue && queue.length !== 0) {
          this.date = this.queueForm.value.startDate;
          this.prevQueue = this.queueForm.value;
          const temp = moment(this.date).format('HH:mm');
          this.time = temp;
        } else {
          this.date = new Date();
          const temp = moment(this.date).format('HH:mm');
          this.time = temp;
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
    if (this.selectedStatus == 'next') {
      this.min = new Date(moment().add(1, 'day').toString());
      this.date = this.min;
      this.max = null;
    }
    if (this.selectedStatus == 'waitConfirm') {
      this.min = new Date(moment().add(1, 'day').toString());
      this.date = this.min;
      this.max = null;
    }
    if (this.selectedStatus == 'waitDoctor') {
      this.min = new Date();
      this.max = new Date();
      this.date = this.min;
    }
  }

  emitQueue(e: any) {
    this.queueForm.patchValue({
      ...e,
    });
  }

  submit() {
    Swal.fire({
      title: `ต้องการบันทึกคิวหรือไม่?`,
      icon: 'question',
      showCancelButton: true,
    }).then(async (value: SweetAlertResult) => {
      console.log(this.selectedStatus, this.prevQueue, this.queueForm.value);

      if (value.isConfirmed) {
        if (this.selectedStatus == 'next') {
          if (this.prevQueue.status != 'healed') {
            this.prevQueue.status = 'next';
          } else {
            this.prevQueue.status = 'finish';
          }
          await this.$queue
            .update(this.prevQueue._id, this.prevQueue)
            .toPromise();

          this.queueForm.patchValue({
            status: 'waitConfirm',
          });
          const body = this.queueForm.value;
          delete body._id;
          const nextQueue = await this.$queue.add(body).toPromise();
          if (nextQueue && nextQueue.length > 0) {
            await this.$line.sendQR({ data: nextQueue[0] }).toPromise();
          }
          Swal.fire('SUCCESS', '', 'success');
          setTimeout(() => {
            this._router.navigate(['reception/queue']);
          }, 1000);
        } else {
          if (this.queueForm.value._id) {
            this.update(this.queueForm.value._id, this.queueForm.value);
          } else {
            this.create(this.queueForm.value);
          }
        }
      }
    });
  }
  update(id: any, value: any) {
    this.$queue.update(id, value).subscribe((res) => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success');
        setTimeout(() => {
          this._router.navigate(['reception/queue']);
        }, 1000);
      } else {
      }
    });
  }
  create(value: any) {
    const body = value;
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

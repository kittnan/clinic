import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-queue-add',
  templateUrl: './queue-add.component.html',
  styleUrls: ['./queue-add.component.scss'],
})
export class QueueAddComponent implements OnInit {
  queueForm = new FormGroup({
    customerId: new FormControl(null, Validators.required),
    customerName: new FormControl('', Validators.required),
    doctorId: new FormControl(null, Validators.required),
    doctorName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null),
    updateBy: new FormControl(null, Validators.required),
  });
  userLogin: any;
  constructor(
    private _route: ActivatedRoute,
    private $queue: QueueHttpService,
    private $customer: CustomerHttpService
  ) {}

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params && params['userId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['userId']
        );
        const customer = await this.$customer.getId(http_param).toPromise();
        this.queueForm.patchValue({
          customerId: customer[0]._id,
          customerName: `${customer[0].titleName}${customer[0].firstName} ${customer[0].lastName}`,
        });
      }
    });
    this.userLogin = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(this.userLogin);
    this.queueForm.patchValue({
      updateBy: this.userLogin._id,
    });
  }

  emit(e: any) {
    this.queueForm.patchValue({
      ...e,
    });
  }
  emitQueue(e: any) {
    
    this.queueForm.patchValue({
      ...e,
    });
  }
  send() {
    Swal.fire({
      title: 'Do you want to save?',
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.create();
      }
    });
  }
  create() {
    this.$queue.add(this.queueForm.value).subscribe((res) => {
      if (res && !res.error && res.length > 0) {
        Swal.fire('SUCCESS', '', 'success');
      }else{
        Swal.fire(`มีคิว ${res.data[0].customerName} อยู่แล้ว`, '', 'error');
        console.log(res);
      }
    });
  }
}

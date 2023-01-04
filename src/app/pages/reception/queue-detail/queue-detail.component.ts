import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';

@Component({
  selector: 'app-queue-detail',
  templateUrl: './queue-detail.component.html',
  styleUrls: ['./queue-detail.component.scss']
})
export class QueueDetailComponent implements OnInit {

  customer:any
  selectedStatus:any = null
  listStatus  :any[] = [
   
    {
      name:'รอตรวจ',
      value:'waitDoctor'
    },
    {
      name:'เลื่อนนัด',
      value:'next'
    },
    {
      name:'ยกเลิก',
      value:'cancel'
    },
    {
      name:'ไม่มา',
      value:'lost'
    },
  ]

  queueForm = new FormGroup({
    _id: new FormControl(null),
    customerId: new FormControl(null, Validators.required),
    customerName: new FormControl('', Validators.required),
    doctorId: new FormControl(null, Validators.required),
    doctorName: new FormControl(null, Validators.required),
    startDate: new FormControl(null, Validators.required),
    endDate: new FormControl(null),
    updateBy: new FormControl(null, Validators.required),
  });
  constructor(
    private _route: ActivatedRoute,
    private $customer: CustomerHttpService,
    private $queue :QueueHttpService
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(async (params) => {
      if (params && params['userId']) {
        const http_param: HttpParams = new HttpParams().set(
          'id',
          params['userId']
        );
        const customer = await this.$customer.getId(http_param).toPromise();
        console.log(customer);
        this.customer = customer[0]
        console.log(this.customer);
        
        const param :HttpParams = new HttpParams().set('customerId',this.customer._id)
        const queue = await this.$queue.queueDayCustomer(param).toPromise()
        console.log(queue);

        if(queue && queue.length===0){
          this.listStatus = [
            {
              name:'นัดคิววันนี้',
              value:'waitDoctor'
            },
            {
              name:'นัดคิวครั้งถัดไป',
              value:'waitConfirm'
            },
          ]
        }
        
        this.queueForm.patchValue({...queue})
        // this.queueForm.patchValue({
        //   customerId: customer[0]._id,
        //   customerName: `${customer[0].titleName}${customer[0].firstName} ${customer[0].lastName}`,
        // });
      }
    });
  }

  emitQueue(e: any) {
    
    this.queueForm.patchValue({
      ...e,
    });
  }

  submit(){

  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-queue-add',
  templateUrl: './queue-add.component.html',
  styleUrls: ['./queue-add.component.scss']
})
export class QueueAddComponent implements OnInit {


  queueForm = new FormGroup({
    userId: new FormControl(null,Validators.required),
    startDate: new FormControl(null,Validators.required),
    endDate: new FormControl(null,Validators.required),
    doctorId: new FormControl(null,Validators.required),
    status: new FormControl(false,Validators.required),
    updateBy: new FormControl(null,Validators.required),
  })
  constructor(
    private _route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      console.log(params);
      if(params && params['userId']){
        this.queueForm.patchValue({
          userId:params['userId'],
        })
      }
      
    })
  }

  emit(e:any){
    this.queueForm.patchValue({
      userId:e._id,
    })
    console.log(e);
  }

}

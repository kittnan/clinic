import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as moment from 'moment';
import { MemberHttpService } from 'src/app/api/member-http.service';

@Component({
  selector: 'app-input-queue',
  templateUrl: './input-queue.component.html',
  styleUrls: ['./input-queue.component.scss'],
})
export class InputQueueComponent implements OnInit {

  @Output() dataChange :EventEmitter<any> = new EventEmitter()
  date:any
  time:any
  start :any

  doctorList:any[] =[]
  doctor:any
  constructor(
    private $member: MemberHttpService
  ) {}

  async ngOnInit(): Promise<void> {
    this.doctorList = await this.$member.getDoctor().toPromise()
  }

  genTime(){
    const date = moment(this.date).format('YYYY-MM-DD')
    this.start = moment(date + ' ' + this.time)
    const doctorFind = this.doctorList.find((d:any)=>d._id==this.doctor)
    let doctor 
    if(doctorFind){
      doctor = {
        doctorId:doctorFind._id,
        doctorName: `${doctorFind.titleName}${doctorFind.firstName} ${doctorFind.lastName}`
      }
    }
    this.dataChange.emit({
      ...doctor,
      startDate:this.start.toDate()
    })
  }
}

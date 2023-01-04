import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-share-customer-detail',
  templateUrl: './share-customer-detail.component.html',
  styleUrls: ['./share-customer-detail.component.scss']
})
export class ShareCustomerDetailComponent implements OnInit {

  @Input() customer :any = {}
  titleNameList = ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'];
  genderList = ['ชาย', 'หญิง'];

  positionList = ['reception', 'doctor', 'admin'];
  constructor() { }

  ngOnInit(): void {
    this.onBirthDay()
  }
  onBirthDay() {
    var m = moment(this.customer.birthDay, 'YYYY-MM-DD');
    var years = moment().diff(m, 'years',false);
    this.customer.age = years.toString()
  }

}

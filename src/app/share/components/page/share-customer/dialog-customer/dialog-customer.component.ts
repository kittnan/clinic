import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { MemberHttpService } from 'src/app/api/member-http.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';

@Component({
  selector: 'app-dialog-customer',
  templateUrl: './dialog-customer.component.html',
  styleUrls: ['./dialog-customer.component.scss'],
})
export class DialogCustomerComponent implements OnInit {
  registerForm = new FormGroup({
    customerId: new FormControl('', Validators.required),
    idCard: new FormControl('', Validators.required),
    titleName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    birthDay: new FormControl('', Validators.required),
    age: new FormControl(''),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    congenitalDisease: new FormControl('', Validators.required),
    allergic: new FormControl('', Validators.required),
    description: new FormControl(''),
    updateBy: new FormControl('', Validators.required),
    status: new FormControl('test'),
  });
  userLogin: any;
  titleNameList = ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'];
  genderList = ['ชาย', 'หญิง'];

  positionList = ['reception', 'doctor', 'admin'];
  readOnlyState: any = false;
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $customer: CustomerHttpService
  ) {}

  ngOnInit(): void {
    const user: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(user);
    this.registerForm.patchValue({
      updateBy: this.userLogin.username,
    });
    if (this.data) {
      this.registerForm.patchValue({
        ...this.data,
        status:'test',
      });
      this.onBirthDay()
      if (this.data.read) this.readOnlyState = true;
    } else {
      this.getCustomerId();
    }
  }

  async getCustomerId() {
    const member = await this.$customer.getLast().toPromise();
    if (member && member.length > 0) {
      this.genCustomerId(member[0].customerId);
    } else {
      this.registerForm.patchValue({
        customerId: 'NH-0001',
      });
    }
  }
  genCustomerId(customerId: any) {
    const str = customerId.split('-');
    let newCustomerId: any = Number(str[1]) + 1;
    newCustomerId = newCustomerId.toString();
    newCustomerId = newCustomerId.padStart(4, '0');
    newCustomerId = `${str[0]}-${newCustomerId}`;
    this.registerForm.patchValue({
      customerId: newCustomerId,
    });
  }

  // ! event html
  onBirthDay() {
    var m = moment(this.registerForm.value.birthDay, 'YYYY-MM-DD');
    var years = moment().diff(m, 'years',false);
    this.registerForm.patchValue({
      age:years.toString()
    })
  
  }

  onSubmit() {
    if (this.data) {
      this.onEdit();
    } else {
      this.onAdd();
    }
  }

  onAdd() {
    Swal.fire({
      title: 'Do you want to add new customer?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.add(this.registerForm.value);
      }
    });
  }

  async add(value: any) {
    this.$customer.add(value).subscribe((res) => {
      if (res && res.length > 0) {
        Swal.fire('SUCCESS', '', 'success');
        this.dialogRef.close(res);
      } else {
        Swal.fire('SOMETHING IS WRONG', '', 'error');
      }
    });
  }

  onEdit() {
    Swal.fire({
      title: 'Do you want to update customer?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.edit(this.registerForm.value);
      }
    });
  }

  edit(member: any) {
    this.$customer.update(this.data._id, member).subscribe((res) => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success');
        this.dialogRef.close(res);
      } else {
        Swal.fire('SOMETHING IS WRONG', '', 'error');
      }
    });
  }
}

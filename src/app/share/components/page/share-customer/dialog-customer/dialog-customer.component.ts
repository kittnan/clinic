import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { MemberHttpService } from 'src/app/api/member-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import * as moment from 'moment';
import { FilesHttpService } from 'src/app/api/files-http.service';
import { HttpParams } from '@angular/common/http';

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
    xrayImage: new FormControl([]),
    status: new FormControl('test'),
  });
  userLogin: any;
  titleNameList = ['นาย', 'นาง', 'นางสาว', 'เด็กชาย', 'เด็กหญิง'];
  genderList = ['ชาย', 'หญิง'];

  positionList = ['reception', 'doctor', 'admin'];
  readOnlyState: any = false;
  @ViewChild('fileInput') fileInput!: ElementRef;
  tempShowFiles: any[] = [];
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $customer: CustomerHttpService,
    private $files: FilesHttpService
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
        status: 'test',
      });
      this.tempShowFiles = [...this.data.xrayImage];
      this.onBirthDay();
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
    var years = moment().diff(m, 'years', false);
    this.registerForm.patchValue({
      age: years.toString(),
    });
  }

  onSubmit() {
    if (this.data) {
      this.onEdit();
    } else {
      this.onAdd();
    }
  }

  async uploadFileToDataBase(files: any) {
    const filesFilter = files.filter((f: any) => !f.date);
    if (filesFilter?.length > 0) {
      const formData: any = await this.addFormData(filesFilter);
      const resUpload = await this.$files.upload(formData).toPromise();
      const resultFilter = this.tempShowFiles.filter((f: any) => f.date);
      return [...resultFilter, ...resUpload];
    }
    return files;
  }

  addFormData(Files: FileList) {
    return new Promise((resolve) => {
      const formData = new FormData();
      for (let i = 0; i < Files.length; i++) {
        formData.append(
          'Files',
          Files[i],
          `${this.registerForm.value.customerId}_${Files[i].name}`
        );
        if (i + 1 === Files.length) resolve(formData);
      }
    });
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
    const resUpload = await this.uploadFileToDataBase(this.tempShowFiles);
    value.xrayImage = resUpload;
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

  async edit(member: any) {
    const resDelete = await this.removeFile(this.tempShowFiles);
    const resUpload = await this.uploadFileToDataBase(this.tempShowFiles);
    member.xrayImage = resUpload;
    this.$customer.update(this.data._id, member).subscribe((res) => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success');
        this.dialogRef.close(res);
      } else {
        Swal.fire('SOMETHING IS WRONG', '', 'error');
      }
    });
  }

  onFileSelected() {
    const oldFile: any = this.registerForm.value.xrayImage;
    let fileUpload: any = this.fileInput.nativeElement.files;
    this.tempShowFiles = [...oldFile, ...fileUpload];
    this.fileInput.nativeElement.value = '';
  }
  onClickDeleteFile(file: any) {
    Swal.fire({
      title: `ต้องการลบไฟล์ ${file.name}?`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.deleteListFile(file);
      }
    });
  }
  async removeFile(tempFiles: any) {
    const fileOld: any = this.registerForm.value.xrayImage;
    const listDelete: any = fileOld.filter(
      (f: any) => !tempFiles.find((fo: any) => fo === f)
    );
    if (listDelete?.length === 0)
      return new Promise((resolve) => resolve(true));
    return await this.loopRemove(listDelete);
  }

  loopRemove(listDelete: any) {
    return new Promise((resolve) => {
      for (let i = 0; i < listDelete.length; i++) {
        const param: HttpParams = new HttpParams().set(
          'path',
          listDelete[i].name
        );
        this.$files.delete(param).subscribe((res) => {});
        if (i + 1 === listDelete.length) resolve(true);
      }
    });
  }
  deleteListFile(file: any) {
    this.tempShowFiles = this.tempShowFiles.filter((f: any) => f != file);
    Swal.fire('ลบไฟล์ในลิสสำเร็จ', '', 'success');
  }
}

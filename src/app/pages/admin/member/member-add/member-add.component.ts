import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MemberHttpService } from 'src/app/api/member-http.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member-add',
  templateUrl: './member-add.component.html',
  styleUrls: ['./member-add.component.scss'],
})
export class MemberAddComponent implements OnInit {
  registerForm = new FormGroup({
    memberId: new FormControl('', Validators.required),
    idCard: new FormControl('', Validators.required),
    titleName: new FormControl('', Validators.required),
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    description: new FormControl(''),
    updateBy: new FormControl('', Validators.required),
  });

  userLogin: any;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private $member: MemberHttpService
  ) {}

  ngOnInit(): void {
    this.getMemberId();

    const user: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(user);
    this.registerForm.patchValue({
      updateBy: this.userLogin.username,
    });
  }

  async getMemberId() {
    const member = await this.$member.getLast().toPromise();
    console.log(member);
    if (member && member.length > 0) {
      this.genMemberId(member[0].memberId);
    }
  }
  genMemberId(memberId: any) {
    const str = memberId.split('-');
    let newMemberId: any = Number(str[1]) + 1;
    newMemberId = newMemberId.toString();
    newMemberId = newMemberId.padStart(4,"0")
    newMemberId = `${str[0]}-${newMemberId}`
    this.registerForm.patchValue({
      memberId: newMemberId
    })
  }

  onSubmit() {
    Swal.fire({
      title: 'Do you want to add new member?',
      icon: 'question',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.add(this.registerForm.value);
      }
    });
  }

  async add(value: any) {
    this.$member.add(value).subscribe((res) => {
      if (res && res.length > 0) {
        Swal.fire('SUCCESS', '', 'success');
        this.dialogRef.close()
      } else {
        Swal.fire('SOMETHING IS WRONG', '', 'error');
      }
    });
  }
}

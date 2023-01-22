import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/api/login.service';
import { QueueHttpService } from 'src/app/api/queue-http.service';
import { ToastService } from 'src/app/toast/toast.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
    private $login: LoginService,
    private _toast: ToastService,
    private _route: ActivatedRoute,
    private $queues: QueueHttpService
  ) {}
  loginForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  async ngOnInit(): Promise<void> {
    const login = localStorage.getItem('userLogin');
    if (login) {
      const json = JSON.parse(login);
      const access: any = await this.access(json.position);
      this.confirmQueue(access);

      // location.href = '/' + access;
    }
  }

  async onLogin() {
    const resLogin = await this.$login.login(this.loginForm.value).toPromise();
    if (resLogin && resLogin.length > 0) {
      const access: any = await this.access(resLogin[0].position);
      const userLogin = JSON.stringify(resLogin[0]);
      localStorage.setItem('userLogin', userLogin);
      localStorage.setItem('access', access.toString());
      this._toast.open('success', 'Signed in successfully');
      this.confirmQueue(access);

      // this._router.navigate([access]);
    } else {
      Swal.fire('login fail something it wrong', '', 'error');
    }
  }

  access(position: String) {
    return new Promise((resolve) => {
      if (position === 'admin') resolve('admin');
      if (position === 'reception') resolve('reception');
      if (position === 'doctor') resolve('doctor');
      if (position === 'doctor') resolve('doctor');
    });
  }

  confirmQueue(access: any) {
    this._route.queryParams.subscribe(async (res) => {
      const { id } = res;
      console.log(id);
      if (id) {
        if (access === 'reception') {
          const param = new HttpParams().set('id', id);
          const queue: any = await this.$queues.get(param).toPromise();
          if (queue && queue[0].status === 'waitConfirm') {
            await this.$queues
              .update(id, { ...queue, status: 'waitDoctor' })
              .toPromise();
            Swal.fire('ยืนยันคิวสำเร็จ', '', 'success').then(
              (value: SweetAlertResult) => {
                location.href = '/' + access;
              }
            );
          } else {
            Swal.fire('ยืนยันคิวซ้ำ', '', 'warning').then(
              (value: SweetAlertResult) => {
                location.href = '/' + access;
              }
            );
          }
        } else {
          Swal.fire('ยืนยันคิวไม่สำเร็จ', '', 'error');
          setTimeout(() => {
            location.href = '/' + access;
          }, 2000);
        }
      } else {
        setTimeout(() => {
          location.href = '/' + access;
        }, 2000);
      }
    });
  }
}

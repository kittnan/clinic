import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/api/login.service';
import { ToastService } from 'src/app/toast/toast.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private _router: Router,
     private $login: LoginService,
     private _toast:ToastService
     ) {}
  loginForm = new FormGroup({
    username: new FormControl<string | null>(null, Validators.required),
    password: new FormControl(null, Validators.required),
  });
  ngOnInit(): void {
    const login = localStorage.getItem('userLogin')
    if(login){
      sessionStorage.clear();
      localStorage.clear()
      location.reload()
    }
  }

  async onLogin() {
    const resLogin = await this.$login.login(this.loginForm.value).toPromise();
    if (resLogin && resLogin.length > 0) {
      const access :any= await this.access(resLogin[0].position);
      const userLogin = JSON.stringify(resLogin[0]);
      localStorage.setItem('userLogin', userLogin);
      localStorage.setItem('access', access.toString());
      this._toast.open('success','Signed in successfully')
      setTimeout(() => {
        location.href = '/' + access;
      }, 2000);
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
}

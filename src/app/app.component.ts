import { Component } from '@angular/core';

interface RouterItems {
  path: any;
  icon: any;
  title: any;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'dentist clinic';

  loginStatus: Boolean = false;
  routerItems!: RouterItems[];
  ngOnInit(): void {
    const token = localStorage.getItem('userLogin');
    const access: any = localStorage.getItem('access');
    this.setHeader(access);
    if (token) {
      this.loginStatus = true;
    } else {
      this.loginStatus = false;
    }
  }

  setHeader(access: String) {
    if (access === 'admin') {
      this.routerItems = [
        {
          path:'/admin/member',
          icon:'group',
          title:'member'
        },
        {
          path:'/admin/customer',
          icon:'group',
          title:'customer'
        },
        {
          path:'/admin/master',
          icon:'category',
          title:'master'
        }
      ]
    }
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  }
}

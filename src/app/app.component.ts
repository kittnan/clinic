import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';

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
  userLogin: any = {};
  loginStatus: Boolean = false;
  routerItems!: RouterItems[];
  sideItems: any[] = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    private _router: Router,
    private _loading: NgxUiLoaderService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);

    const user: any = localStorage.getItem('userLogin');
    this.userLogin = JSON.parse(user);
  }
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
      this.sideItems = [
        {
          title: 'customer',
          icon: 'feed',
          items: [
            {
              path: '/admin/member',
              icon: 'group',
              title: 'member',
            },
            {
              path: '/admin/customer',
              icon: 'group',
              title: 'customer',
            },
            {
              path: '/admin/master',
              icon: 'category',
              title: 'master',
            },
          ],
        },
      ];

      // this.routerItems = [
      //   {
      //     path:'/admin/member',
      //     icon:'group',
      //     title:'member'
      //   },
      //   {
      //     path:'/admin/customer',
      //     icon:'group',
      //     title:'customer'
      //   },
      //   {
      //     path:'/admin/master',
      //     icon:'category',
      //     title:'master'
      //   }
      // ]
    }
    if (access === 'reception') {
      this.sideItems = [
        {
          title: 'customer',
          icon: 'feed',
          items: [
            {
              path: '/reception/customer',
              icon: 'group',
              title: 'customer',
            },
            {
              path: '/reception/queue',
              icon: 'badge',
              title: 'queue',
            },
          ],
        },
      ];

      // this.routerItems = [

      //   {
      //     path:'/reception/customer',
      //     icon:'group',
      //     title:'customer'
      //   },
      //   {
      //     path:'/reception/queue',
      //     icon:'badge',
      //     title:'queue'
      //   },

      // ]
    }
    if (access === 'doctor') {
      this.sideItems = [
        {
          title: 'customer',
          icon: 'feed',
          items: [
            {
              path: '/doctor/queue',
              icon: 'badge',
              title: 'queue',
            },
          ],
        },
      ];

      // this.routerItems = [

      //   // {
      //   //   path:'/doctor/heal',
      //   //   icon:'group',
      //   //   title:'heal'
      //   // },
      //   {
      //     path:'/doctor/queue',
      //     icon:'badge',
      //     title:'queue'
      //   },

      // ]
    }
  }

  logout(): void {
    sessionStorage.clear();
    localStorage.clear();
    location.href = '/';
  }
}

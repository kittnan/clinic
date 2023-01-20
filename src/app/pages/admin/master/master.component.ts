import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  masters = ['checkHeal'];

  master: any;

  constructor(private _loading: NgxUiLoaderService) {}

  ngOnInit(): void {
    this._loading.start();
    this.master = 'checkHeal';
  }
  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.
    this.stopLoading();
  }
  stopLoading() {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }
}

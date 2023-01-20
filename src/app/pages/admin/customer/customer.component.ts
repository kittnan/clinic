import { Component, OnInit } from '@angular/core';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss'],
})
export class CustomerComponent implements OnInit {
  constructor(private _loading: NgxUiLoaderService) {}

  ngOnInit(): void {
    this._loading.start();
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

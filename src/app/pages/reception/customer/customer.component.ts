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
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }
}

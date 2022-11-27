import { Component, OnInit } from '@angular/core';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';

@Component({
  selector: 'app-master',
  templateUrl: './master.component.html',
  styleUrls: ['./master.component.scss'],
})
export class MasterComponent implements OnInit {
  masters = ['checkHeal'];
 
  master: any;

  constructor(
  ){

  }
  ngOnInit(): void {}

  
}

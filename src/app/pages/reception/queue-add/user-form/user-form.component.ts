import { HttpParams } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { CustomerHttpService } from 'src/app/api/customer-http.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {

  @Input() id:any
  constructor(
    private $customer: CustomerHttpService
  ) { }

  ngOnInit(): void {
    const params = new HttpParams().set('id',this.id)
    this.$customer.getId(params).subscribe(res=>console.log(res))
  }

}

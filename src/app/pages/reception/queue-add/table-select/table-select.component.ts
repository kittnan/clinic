import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-table-select',
  templateUrl: './table-select.component.html',
  styleUrls: ['./table-select.component.scss'],
})
export class TableSelectComponent implements OnInit {
  @Output() selectChange: EventEmitter<any> = new EventEmitter();
  displayedColumns: string[] = ['customerId','idCard', 'name', 'phoneNumber', 'action'];
  dataSource! :MatTableDataSource<any>
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(private $customer: CustomerHttpService) {}

  ngOnInit(): void {
    this.$customer.get().subscribe((res) => {
      this.dataSource = new MatTableDataSource(res)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  onSelect(item:any){
    Swal.fire({
      title:`Do you want to select ${item.titleName} ${item.firstName} ${item.lastName}?`,
      icon:'question',
      showCancelButton:true
    }).then((value:SweetAlertResult)=>{
      if(value.isConfirmed){
        Swal.fire('SUCCESS','','success')
        this.selectChange.emit({
          customerId: item._id,
          customerName:`${item.titleName}${item.firstName} ${item.lastName}`
        })
      }
    })
  }
}

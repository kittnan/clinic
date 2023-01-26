import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { MemberAddComponent } from 'src/app/pages/admin/member/member-add/member-add.component';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { DialogCustomerComponent } from './dialog-customer/dialog-customer.component';

@Component({
  selector: 'app-share-customer',
  templateUrl: './share-customer.component.html',
  styleUrls: ['./share-customer.component.scss'],
})
export class ShareCustomerComponent implements OnInit {
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;
  columnsToDisplayWithExpand: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  showAddModal = false;

  constructor(
    public dialog: MatDialog,
    private $customer: CustomerHttpService,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    if (localStorage.getItem('access') === 'admin') this.showAddModal = true;
    this.getMember();
  }

  async getMember() {
    const member = await this.$customer.get().toPromise();
    console.log(member);

    this.dataSource = new MatTableDataSource(member);
    this.setTable();
  }
  setTable() {
    this.displayedColumns = [
      'customerId',
      'idCard',
      'firstName',
      'phoneNumber',
      'action',
      'queue',
    ];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(
      DialogCustomerComponent,
      {
        maxWidth: 1000,
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMember();
      }
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDelete(item: any) {
    Swal.fire({
      title: `${item.firstName} ${item.lastName}`,
      icon: 'question',
      showCancelButton: true,
    }).then((value: SweetAlertResult) => {
      if (value.isConfirmed) {
        this.delete(item._id);
      }
    });
  }
  delete(_id: any) {
    this.$customer.delete(_id).subscribe((res) => {
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success');
        this.getMember();
      } else {
        Swal.fire('ERROR', '', 'error');
      }
    });
  }

  onEdit(item: any) {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      data: item,
      maxWidth: 600,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) {
        this.getMember();
      }
    });
  }

  onView(item: any) {
    const dialogRef = this.dialog.open(DialogCustomerComponent, {
      data: {
        ...item,
        read: true,
      },
      maxWidth: 600,
    });
  }

  onQueue(item: any) {
    console.log(item);

    this._router.navigate(['reception/queue-detail'], {
      queryParams: {
        userId: item._id,
      },
    });
  }
}

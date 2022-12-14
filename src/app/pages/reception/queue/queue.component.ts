import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { CustomerHttpService } from 'src/app/api/customer-http.service';
import { DialogCustomerComponent } from 'src/app/share/components/page/share-customer/dialog-customer/dialog-customer.component';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-queue',
  templateUrl: './queue.component.html',
  styleUrls: ['./queue.component.scss'],
})
export class QueueComponent implements OnInit {
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;
  columnsToDisplayWithExpand: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private $customer: CustomerHttpService,
    private _router: Router
  ) {}

  async ngOnInit(): Promise<void> {
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
      'updateBy',
      'action',
    ];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add() {
    this._router.navigate(['reception/queue-add'])
    // const dialogRef: MatDialogRef<any> = this.dialog.open(
    //   DialogCustomerComponent,
    //   {
    //     maxWidth: 1000,
    //   }
    // );
    // dialogRef.afterClosed().subscribe((res) => {
    //   if (res) {
    //     this.getMember();
    //   }
    // });
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
    this._router.navigate(['reception/queue-add'], {
      queryParams: {
        userId: item._id,
      },
    });
  }
}

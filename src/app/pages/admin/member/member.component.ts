import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MemberHttpService } from 'src/app/api/member-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';
import { MemberAddComponent } from './member-add/member-add.component';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],
})
export class MemberComponent implements OnInit {
  displayedColumns!: string[];
  dataSource!: MatTableDataSource<any>;
  columnsToDisplayWithExpand: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private $member: MemberHttpService,
    private _loading: NgxUiLoaderService
  ) {}

  async ngOnInit(): Promise<void> {
    this._loading.start();
    this.getMember();
  }

  async getMember() {
    const member = await this.$member.get({}).toPromise();
    this.dataSource = new MatTableDataSource(member);
    this.setTable();
    this.stopLoading();
  }
  stopLoading() {
    setTimeout(() => {
      this._loading.stopAll();
    }, 1000);
  }
  setTable() {
    this.displayedColumns = [
      'memberId',
      'firstName',
      'phoneNumber',
      'email',
      'position',
      'updateBy',
      'action',
    ];
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  add() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(MemberAddComponent, {
      maxWidth: 600,
    });
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
    this.$member.delete(_id).subscribe((res) => {
      console.log(res);
      if (res && res.acknowledged) {
        Swal.fire('SUCCESS', '', 'success');
        this.getMember();
      } else {
        Swal.fire('ERROR', '', 'error');
      }
    });
  }

  onEdit(item: any) {
    const dialogRef = this.dialog.open(MemberAddComponent, {
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
    const dialogRef = this.dialog.open(MemberAddComponent, {
      data: {
        ...item,
        read: true,
      },
      maxWidth: 600,
    });
  }
}

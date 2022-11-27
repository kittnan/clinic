import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';
import Swal from 'sweetalert2';
import { DialogCheckupComponent } from './dialog-checkup/dialog-checkup.component';

@Component({
  selector: 'app-checkup',
  templateUrl: './checkup.component.html',
  styleUrls: ['./checkup.component.scss']
})
export class CheckupComponent implements OnInit {

  displayedColumns: string[] = ['no', 'type', 'group', 'code','items','action'];
  dataSource :any

  constructor(
    private $checkup: CheckupHttpService,
    public dialog: MatDialog,
    
  ) {}

  ngOnInit(): void {
    this.$checkup.get().subscribe(res=>{
      this.dataSource = new MatTableDataSource(res)
    })
  }
 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onAdd() {
    const dialogRef = this.dialog.open(DialogCheckupComponent, {
      width: '50%',
      height: '80%',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.length > 0) {
        this.$checkup.get().subscribe((res) => {
          this.dataSource = new MatTableDataSource(res)
        });
      }
    });
  }
  
  onEdit(item: any) {
    this.dialog.open(DialogCheckupComponent, {
      width: '50%',
      height: '80%',
      data: item,
    });
  }

  onDelete(item: any) {
    Swal.fire({
      title: `Do you want to delete ${item.group}?`,
      icon: 'question',
      showCancelButton: true,
    }).then((ans) => {
      if (ans.isConfirmed) {
        this.$checkup.delete(item._id).subscribe((res) => {
          if (res) {
            this.$checkup.get().subscribe((res) => {
              this.dataSource = new MatTableDataSource(res)
            });
          }
        });
      }
    });
  }


}

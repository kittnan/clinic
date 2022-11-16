import { trigger, state, style, transition, animate } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MemberHttpService } from 'src/app/api/member-http.service';
import { MemberAddComponent } from './member-add/member-add.component';


@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.scss'],

})
export class MemberComponent implements OnInit {
  displayedColumns!: string[]
  dataSource!: MatTableDataSource<any>;
  columnsToDisplayWithExpand:any
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(public dialog: MatDialog,
    private $member: MemberHttpService ) {
  }

  async ngOnInit(): Promise<void> {
    const member = await this.getMember()
    console.log(member);
    
    this.dataSource = new MatTableDataSource(member)
    this.displayedColumns = ['memberId','firstName','phoneNumber','email','position','updateBy','action']
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  getMember(){
  return  this.$member.get().toPromise()
  }

  add() {
    const dialogRef: MatDialogRef<any> = this.dialog.open(MemberAddComponent,{
      maxWidth:600
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


  
}


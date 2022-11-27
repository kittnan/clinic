import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CheckupHttpService } from 'src/app/api/checkup-http.service';
import Swal, { SweetAlertResult } from 'sweetalert2';

@Component({
  selector: 'app-dialog-checkup',
  templateUrl: './dialog-checkup.component.html',
  styleUrls: ['./dialog-checkup.component.scss']
})
export class DialogCheckupComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<any>,
    private $checkup: CheckupHttpService,
  ) {}
  forms:any;
  ngOnInit(): void {
    if (this.data) {
      this.forms = this.data;
    } else {
      this.forms = {
        groupType: '',
        group: '',
        code: '',
        checked: false,
        items: [],
      };
    }
  }

  validButton(){
    if(
      this.forms.groupType =='' ||
      this.forms.group  =='' ||
      this.forms.code ==''
      ) {
        return true
      }else{

        return false
      }
  }

  onAdd() {
    this.forms.items.push({
      code: '',
      name: '',
      checked: false,
    });
  }
  onDelete(item: any) {
    this.forms.items = this.forms.items.filter((t:any) => t != item);
  }

  onSave() {
    Swal.fire({
      title:'Do you want to save?',
      icon:'question',
      showCancelButton:true
    }).then((value:SweetAlertResult)=>{
      if(value.isConfirmed){
        this.$checkup.update(this.data._id, this.forms).subscribe((res) => {
          if(res){
            Swal.fire('SUCCESS','','success')
            this.dialogRef.close()
          }
        });
      }
    })
  }

  onSubmit() {
    Swal.fire({
      title:'Do you want to create?',
      icon:'question',
      showCancelButton:true
    }).then((value:SweetAlertResult)=>{
      if(value.isConfirmed){
        this.$checkup.add(this.forms).subscribe(res=>{
          if(res.length >0){
            Swal.fire('SUCCESS','','success')
            this.dialogRef.close(res)
          }
        })
      }
    })
  }
}

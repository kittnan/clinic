import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReceptionRoutingModule } from './reception-routing.module';
import { ReceptionComponent } from './reception.component';
import { CustomerComponent } from './customer/customer.component';
import { ShareModule } from 'src/app/share/share.module';
import { QueueComponent } from './queue/queue.component';
import { MaterialModule } from 'src/app/materials/materials.module';
import { QueueAddComponent } from './queue-add/queue-add.component';
import { TableSelectComponent } from './queue-add/table-select/table-select.component';
import { UserFormComponent } from './queue-add/user-form/user-form.component';


@NgModule({
  declarations: [
    ReceptionComponent,
    CustomerComponent,
    QueueComponent,
    QueueAddComponent,
    TableSelectComponent,
    UserFormComponent
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    ShareModule,
    MaterialModule
  ]
})
export class ReceptionModule { }

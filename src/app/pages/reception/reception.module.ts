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
import { InputQueueComponent } from './queue-detail/components/input-queue/input-queue.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TableQueueComponent } from './queue-add/table-queue/table-queue.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { CustomerAddComponent } from './customer-add/customer-add.component';

@NgModule({
  declarations: [
    ReceptionComponent,
    CustomerComponent,
    QueueComponent,
    QueueAddComponent,
    TableSelectComponent,
    InputQueueComponent,
    TableQueueComponent,
    QueueDetailComponent,
    CustomerAddComponent
  ],
  imports: [
    CommonModule,
    ReceptionRoutingModule,
    ShareModule,
    MaterialModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule


  ]
})
export class ReceptionModule { }

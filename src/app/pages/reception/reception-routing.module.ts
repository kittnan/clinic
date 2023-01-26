import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerAddComponent } from './customer-add/customer-add.component';
import { CustomerComponent } from './customer/customer.component';
import { QueueAddComponent } from './queue-add/queue-add.component';
import { QueueDetailComponent } from './queue-detail/queue-detail.component';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerComponent,
  },
  {
    path: 'customer-add',
    component: CustomerAddComponent,
  },
  {
    path: 'queue',
    component: QueueComponent,
  },
  {
    path: 'queue-add',
    component: QueueAddComponent,
  },
  {
    path: 'queue-detail',
    component: QueueDetailComponent,
  },

  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'queue',
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReceptionRoutingModule {}

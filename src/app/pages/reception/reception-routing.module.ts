import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { QueueAddComponent } from './queue-add/queue-add.component';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
 
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'queue',
    component:QueueComponent
  },
  {
    path:'queue-add',
    component:QueueAddComponent
  },
 
  {
    path:'',
    pathMatch:'full',
    redirectTo:'customer'
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReceptionRoutingModule { }

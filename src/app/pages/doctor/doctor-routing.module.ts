import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HealComponent } from './heal/heal.component';
import { QueueComponent } from './queue/queue.component';

const routes: Routes = [
  {
    path:'',
    component:DoctorComponent,
    children:[
      {
        path:'queue',
        component:QueueComponent
      },
      {
        path:'heal',
        component:HealComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'queue'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

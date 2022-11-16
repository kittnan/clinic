import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DoctorComponent } from './doctor.component';
import { HealComponent } from './heal/heal.component';

const routes: Routes = [
  {
    path:'',
    component:DoctorComponent,
    children:[
      {
        path:'test',
        component:HealComponent
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'test'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CustomerComponent } from './customer/customer.component';
import { MemberComponent } from './member/member.component';

const routes: Routes = [
  {
    path:'member',
    component:MemberComponent
  },
  {
    path:'customer',
    component:CustomerComponent
  },
  {
    path:'',
    pathMatch:'full',
    redirectTo:'member'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

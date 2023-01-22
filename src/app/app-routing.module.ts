import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './pages/admin/admin.module';
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { DoctorModule } from './pages/doctor/doctor.module';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { ReceptionModule } from './pages/reception/reception.module';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'admin',
    loadChildren: () => AdminModule,
  },
  {
    path: 'doctor',
    loadChildren: () => DoctorModule,
  },
  {
    path: 'reception',
    loadChildren: () => ReceptionModule,
  },
  {
    path: 'confirm',
    loadChildren: () => ConfirmComponent,
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

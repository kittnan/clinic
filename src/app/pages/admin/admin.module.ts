import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MaterialModule } from 'src/app/materials/materials.module';
import { ShareModule } from 'src/app/share/share.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MemberComponent } from './member/member.component';
import { MemberAddComponent } from './member/member-add/member-add.component';
import { CustomerComponent } from './customer/customer.component';


@NgModule({
  declarations: [
    AdminComponent,
    MemberComponent,
    MemberAddComponent,
    CustomerComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MaterialModule,
    ShareModule,
    // BrowserAnimationsModule, 
    // BrowserModule,
    // HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class AdminModule { }

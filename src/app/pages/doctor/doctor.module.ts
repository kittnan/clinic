import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule } from './doctor-routing.module';
import { DoctorComponent } from './doctor.component';
import { HealComponent } from './heal/heal.component';
import { ShareModule } from 'src/app/share/share.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    DoctorComponent,
    HealComponent
  ],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    // ShareModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    // FormsModule,
    // ReactiveFormsModule,
    // HttpClientModule
  ]
})
export class DoctorModule { }

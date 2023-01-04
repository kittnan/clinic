import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '../materials/materials.module';
import { NgIconsModule } from '@ng-icons/core';
import { RouterModule } from '@angular/router';
import { ShareCustomerComponent } from './components/page/share-customer/share-customer.component';
import { DialogCustomerComponent } from './components/page/share-customer/dialog-customer/dialog-customer.component';
import { ShareCustomerDetailComponent } from './components/share-customer-detail/share-customer-detail.component';
import { ShareHistoryDetailComponent } from './components/share-history-detail/share-history-detail.component';

@NgModule({
  declarations: [
    ShareCustomerComponent,
    DialogCustomerComponent,
    ShareCustomerDetailComponent,
    ShareHistoryDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule,
    MaterialModule,
    NgIconsModule,
    RouterModule
  ],
  exports: [ 
    ShareCustomerComponent,
    ShareCustomerDetailComponent,
    ShareHistoryDetailComponent
  ],
})
export class ShareModule {}

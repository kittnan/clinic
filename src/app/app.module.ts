import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materials/materials.module';
import { HttpClientModule } from '@angular/common/http';
import { ShareModule } from './share/share.module';

import { NgIconsModule } from '@ng-icons/core';
import { featherAirplay } from '@ng-icons/feather-icons';
import { heroUsers} from '@ng-icons/heroicons/outline';
import { octSignIn } from '@ng-icons/octicons';
import { LoginComponent } from './pages/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ShareModule,
    ReactiveFormsModule,
    FormsModule,
    NgIconsModule.withIcons({ featherAirplay, heroUsers,octSignIn, }),
  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

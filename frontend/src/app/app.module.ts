import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SendResetPasswordMailComponent } from './components/send-reset-password-mail/send-reset-password-mail.component';
import { SignupComponent } from './components/signup/signup.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { EditEventTypeComponent } from './components/edit-event-type/edit-event-type.component';
import { SettingsComponent } from './components/settings/settings.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { AvailabilityComponent } from './components/availability/availability.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SendResetPasswordMailComponent,
    SignupComponent,
    NavbarComponent,
    EventTypesComponent,
    EditEventTypeComponent,
    SettingsComponent,
    BookingsComponent,
    AvailabilityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

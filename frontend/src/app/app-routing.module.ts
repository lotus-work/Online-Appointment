import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AvailabilityComponent } from './components/availability/availability.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { EditEventTypeComponent } from './components/edit-event-type/edit-event-type.component';
import { EventTypesComponent } from './components/event-types/event-types.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SendResetPasswordMailComponent } from './components/send-reset-password-mail/send-reset-password-mail.component';
import { SettingsComponent } from './components/settings/settings.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  
  {path:'', component: HomeComponent},
  {path:'signin', component: LoginComponent},
  {path:'signup', component: SignupComponent},
  {path:'reset-password', component: SendResetPasswordMailComponent},
  {path:'event-types', component: EventTypesComponent},
  {path:'edit-event-types/:id', component: EditEventTypeComponent},
  {path:'availability', component: AvailabilityComponent},
  {path:'settings', component: SettingsComponent},
  {path:'bookings', component: BookingsComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './shared/home/home.component';
import { PathNotFoundComponent } from './shared/path-not-found/path-not-found.component';
import { LoginPatientComponent } from './patient/login-patient/login-patient.component';
import { LoginPractitionerComponent } from './practitioner/login-practitioner/login-practitioner.component';
import { SignupPractitionerComponent } from './practitioner/signup-practitioner/signup-practitioner.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/home' },
  { path: 'home', component: HomeComponent},
  { path: 'login-patient', component:  LoginPatientComponent},
  { path: 'login-practitioner', component: LoginPractitionerComponent},
  { path: 'admin/signup-practitioner', component: SignupPractitionerComponent},
  { path: '**', component: PathNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

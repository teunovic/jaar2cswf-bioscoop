import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {LoginPageComponent} from './login/login-page.component';
import {LogoutComponent} from './logout/logout.component';
import {RegisterPageComponent} from './register/register-page.component';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule
  ],
  declarations: [LoginPageComponent, RegisterPageComponent, LogoutComponent],
  exports: [
    LoginPageComponent,
    RegisterPageComponent,
    LogoutComponent
  ]
})
export class AuthenticationModule { }

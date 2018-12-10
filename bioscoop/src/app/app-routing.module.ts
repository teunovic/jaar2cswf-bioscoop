import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NeedAuthGuard} from './authentication/auth.guard';
import {LoginPageComponent} from './authentication/login/login-page.component';
import {RegisterPageComponent} from './authentication/register/register-page.component';
import {LogoutComponent} from './authentication/logout/logout.component';
import {MoviesCreateComponent} from './movies/movies-create/movies-create.component';
import {MoviesDetailsComponent} from './movies/movies-details/movies-details.component';
import {MoviesListComponent} from './movies/movies-list/movies-list.component';
import {MoviesEditComponent} from './movies/movies-edit/movies-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterPageComponent, pathMatch: 'full' },
  { path: 'movies', component: MoviesListComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/create', component: MoviesCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/:id', component: MoviesDetailsComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/:id/edit', component: MoviesEditComponent, canActivate: [NeedAuthGuard] },
  { path: 'rooms', component: MoviesListComponent, canActivate: [NeedAuthGuard] },
  { path: 'shows', component: MoviesListComponent, canActivate: [NeedAuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

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
import {RoomsListComponent} from './rooms/rooms-list/rooms-list.component';
import {RoomsCreateComponent} from './rooms/rooms-create/rooms-create.component';
import {RoomsDetailsComponent} from './rooms/rooms-details/rooms-details.component';
import {RoomsEditComponent} from './rooms/rooms-edit/rooms-edit.component';
import {ShowsListComponent} from './shows/shows-list/shows-list.component';
import {ShowsCreateComponent} from './shows/shows-create/shows-create.component';
import {ShowsDetailsComponent} from './shows/shows-details/shows-details.component';
import {ShowsEditComponent} from './shows/shows-edit/shows-edit.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterPageComponent, pathMatch: 'full' },
  { path: 'logout', component: LogoutComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies', component: MoviesListComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/create', component: MoviesCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/:id', component: MoviesDetailsComponent, canActivate: [NeedAuthGuard] },
  { path: 'movies/:id/create', component: MoviesEditComponent, canActivate: [NeedAuthGuard] },
  { path: 'rooms', component: RoomsListComponent, canActivate: [NeedAuthGuard] },
  { path: 'rooms/create', component: RoomsCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'rooms/:id', component: RoomsDetailsComponent, canActivate: [NeedAuthGuard] },
  { path: 'rooms/:id/create', component: RoomsEditComponent, canActivate: [NeedAuthGuard] },
  { path: 'shows', component: ShowsListComponent, canActivate: [NeedAuthGuard] },
  { path: 'shows/create', component: ShowsCreateComponent, canActivate: [NeedAuthGuard] },
  { path: 'shows/:id', component: ShowsDetailsComponent, canActivate: [NeedAuthGuard] },
  { path: 'shows/:id/create', component: ShowsEditComponent, canActivate: [NeedAuthGuard] },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

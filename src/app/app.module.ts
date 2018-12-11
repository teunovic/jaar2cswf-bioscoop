import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {NeedAuthGuard} from './authentication/auth.guard';
import {AuthenticationModule} from './authentication/authentication.module';
import {NavbarComponent} from './navbar/navbar.component';
import {MoviesModule} from './movies/movies.module';
import {AppRoutingModule} from './app-routing.module';
import {RoomsModule} from './rooms/rooms.module';
import {ShowsModule} from './shows/shows.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AuthenticationModule,
    MoviesModule,
    RoomsModule,
    ShowsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    NeedAuthGuard
  ],
  bootstrap: [AppComponent],
  exports: [

  ]
})
export class AppModule {
}

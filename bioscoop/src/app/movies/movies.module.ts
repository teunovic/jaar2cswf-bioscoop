import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MoviesListComponent} from './movies-list/movies-list.component';
import {MoviesDetailsComponent} from './movies-details/movies-details.component';
import {MoviesEditComponent} from './movies-edit/movies-edit.component';
import {AppRoutingModule} from '../app-routing.module';
import {MoviesCreateComponent} from './movies-create/movies-create.component';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule
  ],
  declarations: [MoviesListComponent, MoviesDetailsComponent, MoviesEditComponent, MoviesCreateComponent]
})
export class MoviesModule {
}

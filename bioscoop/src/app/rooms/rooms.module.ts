import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {RoomsListComponent} from './rooms-list/rooms-list.component';
import {RoomsEditComponent} from './rooms-edit/rooms-edit.component';
import {RoomsDetailsComponent} from './rooms-details/rooms-details.component';
import {RoomsCreateComponent} from './rooms-create/rooms-create.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule
  ],
  declarations: [RoomsListComponent, RoomsEditComponent, RoomsDetailsComponent, RoomsCreateComponent]
})
export class RoomsModule { }

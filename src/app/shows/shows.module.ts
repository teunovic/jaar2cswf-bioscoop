import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ShowsCreateComponent} from './shows-create/shows-create.component';
import {ShowsDetailsComponent} from './shows-details/shows-details.component';
import {ShowsEditComponent} from './shows-edit/shows-edit.component';
import {ShowsListComponent} from './shows-list/shows-list.component';
import {AppRoutingModule} from '../app-routing.module';
import {FormsModule} from '@angular/forms';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import { SelectDropDownModule } from 'ngx-select-dropdown'
import {ShowFilterPipe} from '../pipes/show-filter.pipe';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    NgbModalModule,
    SelectDropDownModule
  ],
  declarations: [ShowsCreateComponent, ShowsDetailsComponent, ShowsEditComponent, ShowsListComponent, ShowFilterPipe],
})
export class ShowsModule {
}

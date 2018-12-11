import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsEditComponent } from './shows-edit.component';

describe('ShowsEditComponent', () => {
  let component: ShowsEditComponent;
  let fixture: ComponentFixture<ShowsEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

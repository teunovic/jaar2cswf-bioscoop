import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsCreateComponent } from './shows-create.component';

describe('ShowsCreateComponent', () => {
  let component: ShowsCreateComponent;
  let fixture: ComponentFixture<ShowsCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

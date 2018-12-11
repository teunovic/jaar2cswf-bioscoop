import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowsDetailsComponent } from './shows-details.component';

describe('ShowsDetailsComponent', () => {
  let component: ShowsDetailsComponent;
  let fixture: ComponentFixture<ShowsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

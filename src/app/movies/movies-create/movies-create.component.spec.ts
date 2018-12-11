import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MoviesCreateComponent} from './movies-create.component';

describe('MoviesCreateComponent', () => {
  let component: MoviesCreateComponent;
  let fixture: ComponentFixture<MoviesCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MoviesCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MoviesCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

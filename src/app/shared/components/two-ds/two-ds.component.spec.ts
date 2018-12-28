import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TwoDsComponent } from './two-ds.component';

describe('TwoDsComponent', () => {
  let component: TwoDsComponent;
  let fixture: ComponentFixture<TwoDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TwoDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TwoDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

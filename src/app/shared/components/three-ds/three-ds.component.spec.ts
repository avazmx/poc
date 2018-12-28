import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreeDsComponent } from './three-ds.component';

describe('ThreeDsComponent', () => {
  let component: ThreeDsComponent;
  let fixture: ComponentFixture<ThreeDsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreeDsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreeDsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OneDaComponent } from './one-da.component';

describe('OneDaComponent', () => {
  let component: OneDaComponent;
  let fixture: ComponentFixture<OneDaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OneDaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OneDaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

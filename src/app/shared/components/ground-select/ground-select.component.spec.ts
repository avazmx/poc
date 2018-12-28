import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GroundSelectComponent } from './ground-select.component';

describe('GroundSelectComponent', () => {
  let component: GroundSelectComponent;
  let fixture: ComponentFixture<GroundSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GroundSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GroundSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessLevelSelectComponent } from './access-level-select.component';

describe('AccessLevelSelectComponent', () => {
  let component: AccessLevelSelectComponent;
  let fixture: ComponentFixture<AccessLevelSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessLevelSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessLevelSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

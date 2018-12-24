import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitySavedComponent } from './community-saved.component';

describe('CommunitySavedComponent', () => {
  let component: CommunitySavedComponent;
  let fixture: ComponentFixture<CommunitySavedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitySavedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitySavedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

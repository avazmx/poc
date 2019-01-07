import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunitiesDetailsComponent } from './communities-details.component';

describe('CommunitiesDetailsComponent', () => {
  let component: CommunitiesDetailsComponent;
  let fixture: ComponentFixture<CommunitiesDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunitiesDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunitiesDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

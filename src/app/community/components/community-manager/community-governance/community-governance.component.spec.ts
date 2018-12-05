import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityGovernanceComponent } from './community-governance.component';

describe('CommunityGovernanceComponent', () => {
  let component: CommunityGovernanceComponent;
  let fixture: ComponentFixture<CommunityGovernanceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommunityGovernanceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommunityGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
